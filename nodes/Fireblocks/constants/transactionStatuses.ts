/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Fireblocks transaction status types
 */
export const TRANSACTION_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  QUEUED: 'QUEUED',
  PENDING_AUTHORIZATION: 'PENDING_AUTHORIZATION',
  PENDING_SIGNATURE: 'PENDING_SIGNATURE',
  BROADCASTING: 'BROADCASTING',
  PENDING_3RD_PARTY_MANUAL_APPROVAL: 'PENDING_3RD_PARTY_MANUAL_APPROVAL',
  PENDING_3RD_PARTY: 'PENDING_3RD_PARTY',
  CONFIRMING: 'CONFIRMING',
  COMPLETED: 'COMPLETED',
  PARTIALLY_COMPLETED: 'PARTIALLY_COMPLETED',
  CANCELLING: 'CANCELLING',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  TIMEOUT: 'TIMEOUT',
  BLOCKED: 'BLOCKED',
} as const;

export type TransactionStatusType = keyof typeof TRANSACTION_STATUSES;

/**
 * Transaction status options for n8n dropdowns
 */
export const TRANSACTION_STATUS_OPTIONS = Object.entries(TRANSACTION_STATUSES).map(
  ([key, value]) => ({
    name: key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value,
  }),
);

/**
 * Transaction operation types
 */
export const TRANSACTION_OPERATIONS = {
  TRANSFER: 'TRANSFER',
  MINT: 'MINT',
  BURN: 'BURN',
  CONTRACT_CALL: 'CONTRACT_CALL',
  TYPED_MESSAGE: 'TYPED_MESSAGE',
  RAW: 'RAW',
  ENABLE_ASSET: 'ENABLE_ASSET',
  STAKE: 'STAKE',
  UNSTAKE: 'UNSTAKE',
  WITHDRAW: 'WITHDRAW',
} as const;

export type TransactionOperationType = keyof typeof TRANSACTION_OPERATIONS;

/**
 * Transaction operation options for n8n dropdowns
 */
export const TRANSACTION_OPERATION_OPTIONS = Object.entries(TRANSACTION_OPERATIONS).map(
  ([key, value]) => ({
    name: key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value,
  }),
);

/**
 * Fee levels
 */
export const FEE_LEVELS = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

export type FeeLevelType = keyof typeof FEE_LEVELS;

/**
 * Fee level options for n8n dropdowns
 */
export const FEE_LEVEL_OPTIONS = [
  { name: 'High', value: 'HIGH' },
  { name: 'Medium', value: 'MEDIUM' },
  { name: 'Low', value: 'LOW' },
];
