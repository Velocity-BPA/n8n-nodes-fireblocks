/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const createDescription: INodeProperties[] = [
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'https://your-server.com/webhook',
    description: 'The webhook endpoint URL',
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
  },
  {
    displayName: 'Events',
    name: 'events',
    type: 'multiOptions',
    options: [
      { name: 'Transaction Created', value: 'TRANSACTION_CREATED' },
      { name: 'Transaction Status Updated', value: 'TRANSACTION_STATUS_UPDATED' },
      { name: 'Transaction Completed', value: 'TRANSACTION_COMPLETED' },
      { name: 'Transaction Failed', value: 'TRANSACTION_FAILED' },
      { name: 'Transaction Cancelled', value: 'TRANSACTION_CANCELLED' },
      { name: 'Vault Account Created', value: 'VAULT_ACCOUNT_CREATED' },
      { name: 'External Wallet Asset Added', value: 'EXTERNAL_WALLET_ASSET_ADDED' },
      { name: 'Internal Wallet Asset Added', value: 'INTERNAL_WALLET_ASSET_ADDED' },
      { name: 'Network Connection Added', value: 'NETWORK_CONNECTION_ADDED' },
      { name: 'Exchange Account Connected', value: 'EXCHANGE_ACCOUNT_CONNECTED' },
    ],
    default: [],
    description: 'Events to subscribe to',
    displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
  },
];

export const listDescription: INodeProperties[] = [];

export const getDescription: INodeProperties[] = [
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    required: true,
    default: '',
    description: 'The webhook ID',
    displayOptions: { show: { resource: ['webhook'], operation: ['get'] } },
  },
];

export const updateDescription: INodeProperties[] = [
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    required: true,
    default: '',
    description: 'The webhook ID',
    displayOptions: { show: { resource: ['webhook'], operation: ['update'] } },
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    description: 'The new webhook endpoint URL',
    displayOptions: { show: { resource: ['webhook'], operation: ['update'] } },
  },
  {
    displayName: 'Events',
    name: 'events',
    type: 'multiOptions',
    options: [
      { name: 'Transaction Created', value: 'TRANSACTION_CREATED' },
      { name: 'Transaction Status Updated', value: 'TRANSACTION_STATUS_UPDATED' },
      { name: 'Transaction Completed', value: 'TRANSACTION_COMPLETED' },
      { name: 'Transaction Failed', value: 'TRANSACTION_FAILED' },
      { name: 'Transaction Cancelled', value: 'TRANSACTION_CANCELLED' },
      { name: 'Vault Account Created', value: 'VAULT_ACCOUNT_CREATED' },
      { name: 'External Wallet Asset Added', value: 'EXTERNAL_WALLET_ASSET_ADDED' },
      { name: 'Internal Wallet Asset Added', value: 'INTERNAL_WALLET_ASSET_ADDED' },
      { name: 'Network Connection Added', value: 'NETWORK_CONNECTION_ADDED' },
      { name: 'Exchange Account Connected', value: 'EXCHANGE_ACCOUNT_CONNECTED' },
    ],
    default: [],
    description: 'Events to subscribe to',
    displayOptions: { show: { resource: ['webhook'], operation: ['update'] } },
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    options: [
      { name: 'Active', value: 'ACTIVE' },
      { name: 'Disabled', value: 'DISABLED' },
    ],
    default: 'ACTIVE',
    description: 'Webhook status',
    displayOptions: { show: { resource: ['webhook'], operation: ['update'] } },
  },
];

export const deleteDescription: INodeProperties[] = [
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    required: true,
    default: '',
    description: 'The webhook ID to delete',
    displayOptions: { show: { resource: ['webhook'], operation: ['delete'] } },
  },
];

export const getMetricsDescription: INodeProperties[] = [
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    required: true,
    default: '',
    description: 'The webhook ID to get metrics for',
    displayOptions: { show: { resource: ['webhook'], operation: ['getMetrics'] } },
  },
];

export const listNotificationsDescription: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: { show: { resource: ['webhook'], operation: ['listNotifications'] } },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: { minValue: 1, maxValue: 500 },
    displayOptions: { show: { resource: ['webhook'], operation: ['listNotifications'], returnAll: [false] } },
  },
];

export const resendNotificationDescription: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'string',
    required: true,
    default: '',
    description: 'The notification ID to resend',
    displayOptions: { show: { resource: ['webhook'], operation: ['resendNotification'] } },
  },
];

export async function executeCreate(this: IExecuteFunctions, index: number): Promise<unknown> {
  const url = this.getNodeParameter('url', index) as string;
  const events = this.getNodeParameter('events', index) as string[];
  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: '/webhooks',
    body: { url, events },
  });
}

export async function executeList(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/webhooks' });
}

export async function executeGet(this: IExecuteFunctions, index: number): Promise<unknown> {
  const webhookId = this.getNodeParameter('webhookId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/webhooks/${webhookId}` });
}

export async function executeUpdate(this: IExecuteFunctions, index: number): Promise<unknown> {
  const webhookId = this.getNodeParameter('webhookId', index) as string;
  const url = this.getNodeParameter('url', index, '') as string;
  const events = this.getNodeParameter('events', index, []) as string[];
  const status = this.getNodeParameter('status', index, '') as string;
  const body: Record<string, unknown> = {};
  if (url) body.url = url;
  if (events.length > 0) body.events = events;
  if (status) body.status = status;
  return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: `/webhooks/${webhookId}`, body });
}

export async function executeDelete(this: IExecuteFunctions, index: number): Promise<unknown> {
  const webhookId = this.getNodeParameter('webhookId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/webhooks/${webhookId}` });
}

export async function executeGetMetrics(this: IExecuteFunctions, index: number): Promise<unknown> {
  const webhookId = this.getNodeParameter('webhookId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/webhooks/${webhookId}/metrics` });
}

export async function executeListNotifications(this: IExecuteFunctions, index: number): Promise<unknown> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  if (returnAll) {
    return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/webhooks/notifications' }, 'data');
  }
  const limit = this.getNodeParameter('limit', index) as number;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/webhooks/notifications', qs: { limit } });
}

export async function executeResendNotification(this: IExecuteFunctions, index: number): Promise<unknown> {
  const notificationId = this.getNodeParameter('notificationId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: `/webhooks/notifications/${notificationId}/resend` });
}
