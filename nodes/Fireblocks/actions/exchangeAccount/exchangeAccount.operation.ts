/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const listDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'hidden',
    default: 'list',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['list'] } },
  },
];

export const getDescription: INodeProperties[] = [
  {
    displayName: 'Exchange Account ID',
    name: 'exchangeAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the exchange account',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['get'] } },
  },
];

export const getAssetDescription: INodeProperties[] = [
  {
    displayName: 'Exchange Account ID',
    name: 'exchangeAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the exchange account',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['getAsset'] } },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to get balance for',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['getAsset'] } },
  },
];

export const internalTransferDescription: INodeProperties[] = [
  {
    displayName: 'Exchange Account ID',
    name: 'exchangeAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the exchange account',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['internalTransfer'] } },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset to transfer',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['internalTransfer'] } },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'string',
    required: true,
    default: '',
    description: 'Amount to transfer',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['internalTransfer'] } },
  },
  {
    displayName: 'Source Type',
    name: 'sourceType',
    type: 'options',
    required: true,
    default: 'SPOT',
    options: [
      { name: 'Spot', value: 'SPOT' },
      { name: 'Futures', value: 'FUTURES' },
      { name: 'Funding', value: 'FUNDING' },
    ],
    description: 'The source trading account type',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['internalTransfer'] } },
  },
  {
    displayName: 'Destination Type',
    name: 'destType',
    type: 'options',
    required: true,
    default: 'FUTURES',
    options: [
      { name: 'Spot', value: 'SPOT' },
      { name: 'Futures', value: 'FUTURES' },
      { name: 'Funding', value: 'FUNDING' },
    ],
    description: 'The destination trading account type',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['internalTransfer'] } },
  },
];

export const convertDescription: INodeProperties[] = [
  {
    displayName: 'Exchange Account ID',
    name: 'exchangeAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the exchange account',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['convert'] } },
  },
  {
    displayName: 'Source Asset ID',
    name: 'srcAsset',
    type: 'string',
    required: true,
    default: '',
    description: 'The source asset to convert from',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['convert'] } },
  },
  {
    displayName: 'Destination Asset ID',
    name: 'destAsset',
    type: 'string',
    required: true,
    default: '',
    description: 'The destination asset to convert to',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['convert'] } },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'string',
    required: true,
    default: '',
    description: 'Amount to convert',
    displayOptions: { show: { resource: ['exchangeAccount'], operation: ['convert'] } },
  },
];

export async function executeList(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: '/exchange_accounts',
  });
}

export async function executeGet(this: IExecuteFunctions, index: number): Promise<unknown> {
  const exchangeAccountId = this.getNodeParameter('exchangeAccountId', index) as string;
  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/exchange_accounts/${exchangeAccountId}`,
  });
}

export async function executeGetAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const exchangeAccountId = this.getNodeParameter('exchangeAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/exchange_accounts/${exchangeAccountId}/${assetId}`,
  });
}

export async function executeInternalTransfer(this: IExecuteFunctions, index: number): Promise<unknown> {
  const exchangeAccountId = this.getNodeParameter('exchangeAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const amount = this.getNodeParameter('amount', index) as string;
  const sourceType = this.getNodeParameter('sourceType', index) as string;
  const destType = this.getNodeParameter('destType', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/exchange_accounts/${exchangeAccountId}/internal_transfer`,
    body: { asset: assetId, amount, sourceType, destType },
  });
}

export async function executeConvert(this: IExecuteFunctions, index: number): Promise<unknown> {
  const exchangeAccountId = this.getNodeParameter('exchangeAccountId', index) as string;
  const srcAsset = this.getNodeParameter('srcAsset', index) as string;
  const destAsset = this.getNodeParameter('destAsset', index) as string;
  const amount = this.getNodeParameter('amount', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/exchange_accounts/${exchangeAccountId}/convert`,
    body: { srcAsset, destAsset, amount },
  });
}
