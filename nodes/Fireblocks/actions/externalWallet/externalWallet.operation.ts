/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const listDescription: INodeProperties[] = [];
export const createDescription: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'Name for the external wallet',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['create'] } },
  },
  {
    displayName: 'Customer Reference ID',
    name: 'customerRefId',
    type: 'string',
    default: '',
    description: 'Customer reference ID for AML/KYT',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['create'] } },
  },
];

export const getDescription: INodeProperties[] = [
  {
    displayName: 'Wallet ID',
    name: 'walletId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the external wallet',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['get'] } },
  },
];

export const deleteDescription: INodeProperties[] = [
  {
    displayName: 'Wallet ID',
    name: 'walletId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the external wallet to delete',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['delete'] } },
  },
];

export const addAssetDescription: INodeProperties[] = [
  {
    displayName: 'Wallet ID',
    name: 'walletId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the external wallet',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['addAsset'] } },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to add',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['addAsset'] } },
  },
  {
    displayName: 'Address',
    name: 'address',
    type: 'string',
    required: true,
    default: '',
    description: 'The address for this asset',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['addAsset'] } },
  },
  {
    displayName: 'Tag',
    name: 'tag',
    type: 'string',
    default: '',
    description: 'Tag/memo for the address',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['addAsset'] } },
  },
];

export const removeAssetDescription: INodeProperties[] = [
  {
    displayName: 'Wallet ID',
    name: 'walletId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the external wallet',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['removeAsset'] } },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to remove',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['removeAsset'] } },
  },
];

export const setCustomerRefIdDescription: INodeProperties[] = [
  {
    displayName: 'Wallet ID',
    name: 'walletId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the external wallet',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['setCustomerRefId'] } },
  },
  {
    displayName: 'Customer Reference ID',
    name: 'customerRefId',
    type: 'string',
    required: true,
    default: '',
    description: 'Customer reference ID for AML/KYT',
    displayOptions: { show: { resource: ['externalWallet'], operation: ['setCustomerRefId'] } },
  },
];

export async function executeList(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/external_wallets' });
}

export async function executeCreate(this: IExecuteFunctions, index: number): Promise<unknown> {
  const name = this.getNodeParameter('name', index) as string;
  const customerRefId = this.getNodeParameter('customerRefId', index, '') as string;
  const body: Record<string, string> = { name };
  if (customerRefId) body.customerRefId = customerRefId;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/external_wallets', body });
}

export async function executeGet(this: IExecuteFunctions, index: number): Promise<unknown> {
  const walletId = this.getNodeParameter('walletId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/external_wallets/${walletId}` });
}

export async function executeDelete(this: IExecuteFunctions, index: number): Promise<unknown> {
  const walletId = this.getNodeParameter('walletId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/external_wallets/${walletId}` });
}

export async function executeAddAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const walletId = this.getNodeParameter('walletId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const address = this.getNodeParameter('address', index) as string;
  const tag = this.getNodeParameter('tag', index, '') as string;
  const body: Record<string, string> = { address };
  if (tag) body.tag = tag;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: `/external_wallets/${walletId}/${assetId}`, body });
}

export async function executeRemoveAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const walletId = this.getNodeParameter('walletId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/external_wallets/${walletId}/${assetId}` });
}

export async function executeSetCustomerRefId(this: IExecuteFunctions, index: number): Promise<unknown> {
  const walletId = this.getNodeParameter('walletId', index) as string;
  const customerRefId = this.getNodeParameter('customerRefId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: `/external_wallets/${walletId}/set_customer_ref_id`, body: { customerRefId } });
}
