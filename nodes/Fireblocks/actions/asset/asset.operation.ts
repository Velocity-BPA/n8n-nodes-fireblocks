/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const listSupportedDescription: INodeProperties[] = [];

export const listDescription: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: { show: { resource: ['asset'], operation: ['list'] } },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: { minValue: 1, maxValue: 500 },
    displayOptions: { show: { resource: ['asset'], operation: ['list'], returnAll: [false] } },
  },
];

export const getDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to get details for',
    displayOptions: { show: { resource: ['asset'], operation: ['get'] } },
  },
];

export const registerDescription: INodeProperties[] = [
  {
    displayName: 'Blockchain ID',
    name: 'blockchainId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'ETH, BSC, POLYGON...',
    description: 'The blockchain to register the asset on',
    displayOptions: { show: { resource: ['asset'], operation: ['register'] } },
  },
  {
    displayName: 'Contract Address',
    name: 'address',
    type: 'string',
    required: true,
    default: '',
    description: 'The contract address of the token',
    displayOptions: { show: { resource: ['asset'], operation: ['register'] } },
  },
  {
    displayName: 'Symbol',
    name: 'symbol',
    type: 'string',
    default: '',
    description: 'Token symbol (optional, will be fetched from contract if not provided)',
    displayOptions: { show: { resource: ['asset'], operation: ['register'] } },
  },
];

export const updateMetadataDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to update',
    displayOptions: { show: { resource: ['asset'], operation: ['updateMetadata'] } },
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    description: 'Custom name for the asset',
    displayOptions: { show: { resource: ['asset'], operation: ['updateMetadata'] } },
  },
  {
    displayName: 'Icon URL',
    name: 'iconUrl',
    type: 'string',
    default: '',
    description: 'Custom icon URL for the asset',
    displayOptions: { show: { resource: ['asset'], operation: ['updateMetadata'] } },
  },
];

export const setPriceDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to set price for',
    displayOptions: { show: { resource: ['asset'], operation: ['setPrice'] } },
  },
  {
    displayName: 'Price (USD)',
    name: 'price',
    type: 'string',
    required: true,
    default: '',
    description: 'The price in USD',
    displayOptions: { show: { resource: ['asset'], operation: ['setPrice'] } },
  },
];

export const listBlockchainsDescription: INodeProperties[] = [];

export const getBlockchainDescription: INodeProperties[] = [
  {
    displayName: 'Blockchain ID',
    name: 'blockchainId',
    type: 'string',
    required: true,
    default: '',
    description: 'The blockchain ID',
    displayOptions: { show: { resource: ['asset'], operation: ['getBlockchain'] } },
  },
];

export async function executeListSupported(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/supported_assets' });
}

export async function executeList(this: IExecuteFunctions, index: number): Promise<unknown> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  if (returnAll) {
    return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/assets' }, 'assets');
  }
  const limit = this.getNodeParameter('limit', index) as number;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/assets', qs: { limit } });
}

export async function executeGet(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/assets/${assetId}` });
}

export async function executeRegister(this: IExecuteFunctions, index: number): Promise<unknown> {
  const blockchainId = this.getNodeParameter('blockchainId', index) as string;
  const address = this.getNodeParameter('address', index) as string;
  const symbol = this.getNodeParameter('symbol', index, '') as string;
  const body: Record<string, string> = { blockchainId, address };
  if (symbol) body.symbol = symbol;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/assets', body });
}

export async function executeUpdateMetadata(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const name = this.getNodeParameter('name', index, '') as string;
  const iconUrl = this.getNodeParameter('iconUrl', index, '') as string;
  const body: Record<string, string> = {};
  if (name) body.name = name;
  if (iconUrl) body.iconUrl = iconUrl;
  return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: `/assets/${assetId}`, body });
}

export async function executeSetPrice(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const price = this.getNodeParameter('price', index) as string;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: `/assets/prices/${assetId}`, body: { price } });
}

export async function executeListBlockchains(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/blockchains' });
}

export async function executeGetBlockchain(this: IExecuteFunctions, index: number): Promise<unknown> {
  const blockchainId = this.getNodeParameter('blockchainId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/blockchains/${blockchainId}` });
}
