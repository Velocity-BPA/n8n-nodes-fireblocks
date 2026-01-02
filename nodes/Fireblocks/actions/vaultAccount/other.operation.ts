/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const hideDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account to hide',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['hide'],
      },
    },
  },
];

export const unhideDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account to unhide',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['unhide'],
      },
    },
  },
];

export const getBalanceDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['getBalance'],
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
    description: 'The asset ID to get balance for',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['getBalance'],
      },
    },
  },
];

export const setCustomerRefIdDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['setCustomerRefId'],
      },
    },
  },
  {
    displayName: 'Customer Reference ID',
    name: 'customerRefId',
    type: 'string',
    required: true,
    default: '',
    description: 'Customer reference ID for AML/KYT tracking',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['setCustomerRefId'],
      },
    },
  },
];

export const setAutoFuelDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['setAutoFuel'],
      },
    },
  },
  {
    displayName: 'Auto Fuel',
    name: 'autoFuel',
    type: 'boolean',
    required: true,
    default: true,
    description: 'Whether to enable or disable auto fuel for this account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['setAutoFuel'],
      },
    },
  },
];

export const getMaxSpendableDescription: INodeProperties[] = [
  {
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['getMaxSpendable'],
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
    description: 'The asset ID to get max spendable amount for',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['getMaxSpendable'],
      },
    },
  },
  {
    displayName: 'Manual Signing',
    name: 'manualSigning',
    type: 'boolean',
    default: false,
    description: 'Whether the transaction will use manual signing',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['getMaxSpendable'],
      },
    },
  },
];

export async function executeHide(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/hide`,
  });
}

export async function executeUnhide(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/unhide`,
  });
}

export async function executeGetBalance(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}`,
  });
}

export async function executeSetCustomerRefId(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const customerRefId = this.getNodeParameter('customerRefId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/set_customer_ref_id`,
    body: { customerRefId },
  });
}

export async function executeSetAutoFuel(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const autoFuel = this.getNodeParameter('autoFuel', index) as boolean;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/vault/accounts/${vaultAccountId}/set_auto_fuel`,
    body: { autoFuel },
  });
}

export async function executeGetMaxSpendable(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const assetId = this.getNodeParameter('assetId', index) as string;
  const manualSigning = this.getNodeParameter('manualSigning', index) as boolean;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}/${assetId}/max_spendable_amount`,
    qs: { manualSigning },
  });
}
