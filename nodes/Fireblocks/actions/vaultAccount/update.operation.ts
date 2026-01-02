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
    displayName: 'Vault Account ID',
    name: 'vaultAccountId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the vault account to update',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'New Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'New name for the vault account',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['update'],
      },
    },
  },
];

export async function execute(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
  const name = this.getNodeParameter('name', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'PUT',
    endpoint: `/vault/accounts/${vaultAccountId}`,
    body: { name },
  });
}
