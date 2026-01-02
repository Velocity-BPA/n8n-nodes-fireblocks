/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Fireblocks API environment URLs
 */
export const FIREBLOCKS_ENVIRONMENTS = {
  production: 'https://api.fireblocks.io/v1',
  sandbox: 'https://sandbox-api.fireblocks.io/v1',
} as const;

export type FireblocksEnvironment = keyof typeof FIREBLOCKS_ENVIRONMENTS;
