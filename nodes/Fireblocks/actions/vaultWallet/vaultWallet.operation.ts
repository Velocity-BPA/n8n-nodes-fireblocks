/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const listDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['list'],
      },
    },
  },
];

export const createDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'BTC, ETH, USDT_ERC20...',
    description: 'The asset ID to activate in the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['create'],
      },
    },
  },
];

export const getAssetDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['getAsset'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to get details for',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['getAsset'],
      },
    },
  },
];

export const refreshBalanceDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['refreshBalance'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to refresh balance for',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['refreshBalance'],
      },
    },
  },
];

export const listAddressesDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['listAddresses'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to list addresses for',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['listAddresses'],
      },
    },
  },
];

export const createAddressDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['createAddress'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to create a deposit address for',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['createAddress'],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    description: 'Optional description for the new address',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['createAddress'],
      },
    },
  },
  {
    displayName: 'Customer Reference ID',
    name: 'customerRefId',
    type: 'string',
    default: '',
    description: 'Optional customer reference ID for AML/KYT',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['createAddress'],
      },
    },
  },
];

export const updateAddressDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['updateAddress'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['updateAddress'],
      },
    },
  },
  {
    displayName: 'Address ID',
    name: 'addressId',
    type: 'string',
    required: true,
    default: '',
    description: 'The address ID to update',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['updateAddress'],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    description: 'New description for the address',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['updateAddress'],
      },
    },
  },
];

export const getUnspentInputsDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['getUnspentInputs'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'BTC, LTC...',
    description: 'The UTXO-based asset ID',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['getUnspentInputs'],
      },
    },
  },
];

export const convertLegacyAddressDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['convertLegacyAddress'],
      },
    },
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['convertLegacyAddress'],
      },
    },
  },
  {
    displayName: 'Address ID',
    name: 'addressId',
    type: 'string',
    required: true,
    default: '',
    description: 'The address ID to convert',
    displayOptions: {
      show: {
        resource: ['vaultWallet'],
        operation: ['convertLegacyAddress'],
      },
    },
  },
];

export async function executeList(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}`,
  });
}

export async function executeCreate(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}`,
  });
}

export async function executeGetAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}`,
  });
}

export async function executeRefreshBalance(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/balance`,
  });
}

export async function executeListAddresses(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequestAllItems.call(
    this,
    {
      method: 'GET',
      endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/addresses_paginated`,
    },
    'addresses',
  );
}

export async function executeCreateAddress(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const description = this.getNodeParameter('description', index, '') as string;
  const customerRefId = this.getNodeParameter('customerRefId', index, '') as string;

  const body: Record<string, string> = {};
  if (description) body.description = description;
  if (customerRefId) body.customerRefId = customerRefId;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/addresses`,
    body: Object.keys(body).length > 0 ? body : undefined,
  });
}

export async function executeUpdateAddress(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const addressId = this.getNodeParameter('addressId', index) as string;
  const description = this.getNodeParameter('description', index, '') as string;

  return fireblocksApiRequest.call(this, {
    method: 'PUT',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}`,
    body: { description },
  });
}

export async function executeGetUnspentInputs(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/unspent_inputs`,
  });
}

export async function executeConvertLegacyAddress(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const addressId = this.getNodeParameter('addressId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}/create_legacy`,
  });
}
