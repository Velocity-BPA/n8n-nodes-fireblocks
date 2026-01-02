/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const description: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'Name for the new vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Hidden on UI',
        name: 'hiddenOnUI',
        type: 'boolean',
        default: false,
        description: 'Whether to hide this account on the Fireblocks console',
      },
      {
        displayName: 'Customer Reference ID',
        name: 'customerRefId',
        type: 'string',
        default: '',
        description: 'Custom reference ID for AML/KYT tracking',
      },
      {
        displayName: 'Auto Fuel',
        name: 'autoFuel',
        type: 'boolean',
        default: false,
        description: 'Whether to enable auto fuel (gas station) for this account',
      },
    ],
  },
];

export async function execute(this: IExecuteFunctions, index: number): Promise<unknown> {
  const name = this.getNodeParameter('name', index) as string;
  const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as {
    hiddenOnUI?: boolean;
    customerRefId?: string;
    autoFuel?: boolean;
  };

  const body: Record<string, unknown> = {
    name,
    ...additionalOptions,
  };

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: '/vault/accounts',
    body,
  });
}
