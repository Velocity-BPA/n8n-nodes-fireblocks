/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import type { FireblocksJwtPayload } from '../types/fireblocks.types';

/**
 * Create SHA-256 hash of the request body
 */
export function hashBody(body: string | object | undefined): string {
  const bodyString = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : '';
  return crypto.createHash('sha256').update(bodyString).digest('hex');
}

/**
 * Sign a JWT token for Fireblocks API authentication
 */
export function signJwt(
  apiKey: string,
  privateKey: string,
  uri: string,
  bodyHash: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const nonce = uuidv4();

  const payload: FireblocksJwtPayload = {
    uri,
    nonce,
    iat: now,
    exp: now + 55, // JWT expires in 55 seconds
    sub: apiKey,
    bodyHash,
  };

  // Ensure the private key is properly formatted
  let formattedKey = privateKey;
  if (!privateKey.includes('-----BEGIN')) {
    formattedKey = `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}\n-----END RSA PRIVATE KEY-----`;
  }

  return jwt.sign(payload, formattedKey, {
    algorithm: 'RS256',
  });
}

/**
 * Generate authentication headers for Fireblocks API requests
 */
export function generateAuthHeaders(
  apiKey: string,
  privateKey: string,
  uri: string,
  body?: string | object,
): Record<string, string> {
  const bodyHash = hashBody(body);
  const token = signJwt(apiKey, privateKey, uri, bodyHash);

  return {
    'X-API-Key': apiKey,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Generate idempotency key for POST requests
 */
export function generateIdempotencyKey(): string {
  return uuidv4();
}
