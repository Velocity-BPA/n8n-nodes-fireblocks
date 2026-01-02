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
    description: 'The ID of the vault account to retrieve',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['get'],
      },
    },
  },
];

export async function execute(this: IExecuteFunctions, index: number): Promise<unknown> {
  const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/vault/accounts/${vaultAccountId}`,
  });
}
