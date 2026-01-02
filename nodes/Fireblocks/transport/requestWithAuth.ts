/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import type { IExecuteFunctions, ILoadOptionsFunctions, IHookFunctions, IWebhookFunctions } from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';
import { FIREBLOCKS_ENVIRONMENTS } from '../constants/environments';
import { generateAuthHeaders, generateIdempotencyKey } from './jwtSigner';
import type { FireblocksCredentials, FireblocksError } from '../types/fireblocks.types';

type ExecutionContext = IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions;

/**
 * Fireblocks API error codes
 */
const ERROR_CODES: Record<number, string> = {
  400: 'Bad Request - Invalid parameters or malformed request',
  401: 'Unauthorized - Invalid API key or JWT signature',
  403: 'Forbidden - Insufficient permissions for this operation',
  404: 'Not Found - Resource does not exist',
  409: 'Conflict - Resource already exists or state conflict',
  422: 'Unprocessable Entity - Validation failed',
  429: 'Too Many Requests - Rate limit exceeded',
  500: 'Internal Server Error - Fireblocks server error',
  502: 'Bad Gateway - Fireblocks service unavailable',
  503: 'Service Unavailable - Fireblocks maintenance',
};

/**
 * Parse Fireblocks error response
 */
function parseFireblocksError(error: AxiosError): FireblocksError {
  const response = error.response;
  const data = response?.data as Record<string, unknown> | undefined;

  return {
    code: response?.status || 500,
    message:
      (data?.message as string) ||
      (data?.error as string) ||
      ERROR_CODES[response?.status || 500] ||
      error.message,
    data: data,
  };
}

/**
 * Sleep for a specified duration (for retry logic)
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Options for Fireblocks API requests
 */
export interface FireblocksRequestOptions {
  method: Method;
  endpoint: string;
  body?: Record<string, unknown>;
  qs?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  retries?: number;
}

/**
 * Make an authenticated request to the Fireblocks API
 */
export async function fireblocksApiRequest(
  this: ExecutionContext,
  options: FireblocksRequestOptions,
): Promise<unknown> {
  const credentials = (await this.getCredentials('fireblocksApi')) as unknown as FireblocksCredentials;

  if (!credentials.apiKey || !credentials.privateKey) {
    throw new NodeOperationError(
      this.getNode(),
      'Fireblocks API credentials are not properly configured',
    );
  }

  const baseUrl = FIREBLOCKS_ENVIRONMENTS[credentials.environment] || FIREBLOCKS_ENVIRONMENTS.production;
  const uri = options.endpoint;
  const url = `${baseUrl}${uri}`;

  // Filter out undefined query parameters
  const queryParams: Record<string, string> = {};
  if (options.qs) {
    for (const [key, value] of Object.entries(options.qs)) {
      if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = String(value);
      }
    }
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const fullUri = queryString ? `${uri}?${queryString}` : uri;

  // Generate authentication headers
  const authHeaders = generateAuthHeaders(
    credentials.apiKey,
    credentials.privateKey,
    fullUri,
    options.body,
  );

  // Add idempotency key for POST requests
  const requestHeaders: Record<string, string> = {
    ...authHeaders,
    ...options.headers,
  };

  if (options.method.toUpperCase() === 'POST') {
    requestHeaders['Idempotency-Key'] = generateIdempotencyKey();
  }

  const axiosConfig: AxiosRequestConfig = {
    method: options.method,
    url,
    headers: requestHeaders,
    params: queryParams,
    data: options.body,
    timeout: 30000,
    validateStatus: () => true,
  };

  const maxRetries = options.retries ?? 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios(axiosConfig);

      // Check for rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers['retry-after'] || '5', 10);
        if (attempt < maxRetries) {
          await sleep(retryAfter * 1000);
          continue;
        }
        throw new NodeApiError(this.getNode(), {
          message: 'Rate limit exceeded',
          description: `Too many requests. Please try again after ${retryAfter} seconds.`,
          httpCode: '429',
        });
      }

      // Check for errors
      if (response.status >= 400) {
        const errorData = response.data as Record<string, unknown>;
        throw new NodeApiError(this.getNode(), {
          message: (errorData.message as string) || ERROR_CODES[response.status] || 'API Error',
          description: JSON.stringify(errorData),
          httpCode: String(response.status),
        });
      }

      return response.data;
    } catch (error) {
      if (error instanceof NodeApiError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const fireblocksError = parseFireblocksError(error);

        // Retry on 5xx errors
        if (fireblocksError.code >= 500 && attempt < maxRetries) {
          await sleep(Math.pow(2, attempt) * 1000);
          lastError = error;
          continue;
        }

        throw new NodeApiError(this.getNode(), {
          message: fireblocksError.message,
          description: JSON.stringify(fireblocksError.data),
          httpCode: String(fireblocksError.code),
        });
      }

      lastError = error as Error;
    }
  }

  throw new NodeOperationError(
    this.getNode(),
    lastError?.message || 'Unknown error occurred',
  );
}

/**
 * Make a paginated request to the Fireblocks API
 */
export async function fireblocksApiRequestAllItems(
  this: ExecutionContext,
  options: FireblocksRequestOptions,
  propertyName: string = '',
  limit: number = 500,
): Promise<unknown[]> {
  const returnData: unknown[] = [];
  let responseData: unknown;
  let after: string | undefined;

  const qs: Record<string, string | number | boolean | undefined> = { ...options.qs, limit };

  do {
    if (after) {
      qs.after = after;
    }

    responseData = await fireblocksApiRequest.call(this, {
      ...options,
      qs: qs as Record<string, string | number | boolean | undefined>,
    });

    const items = propertyName
      ? (responseData as Record<string, unknown[]>)[propertyName]
      : (responseData as unknown[]);

    if (Array.isArray(items)) {
      returnData.push(...items);

      // Get the next page cursor
      const paging = (responseData as Record<string, unknown>).paging as
        | { after?: string }
        | undefined;
      after = paging?.after;
    } else {
      break;
    }
  } while (after);

  return returnData;
}

/**
 * Validate Fireblocks credentials
 */
export async function validateCredentials(
  this: ExecutionContext,
): Promise<boolean> {
  try {
    await fireblocksApiRequest.call(this, {
      method: 'GET',
      endpoint: '/vault/accounts_paged',
      qs: { limit: 1 },
    });
    return true;
  } catch {
    return false;
  }
}
