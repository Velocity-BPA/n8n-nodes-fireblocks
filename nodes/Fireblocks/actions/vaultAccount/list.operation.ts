/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const description: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    description: 'Max number of results to return',
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['vaultAccount'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Name Prefix',
        name: 'namePrefix',
        type: 'string',
        default: '',
        description: 'Filter vault accounts by name prefix',
      },
      {
        displayName: 'Name Suffix',
        name: 'nameSuffix',
        type: 'string',
        default: '',
        description: 'Filter vault accounts by name suffix',
      },
      {
        displayName: 'Min Amount Threshold',
        name: 'minAmountThreshold',
        type: 'number',
        default: 0,
        description: 'Filter accounts with balance above this threshold',
      },
      {
        displayName: 'Asset ID',
        name: 'assetId',
        type: 'string',
        default: '',
        description: 'Filter accounts containing this asset',
      },
      {
        displayName: 'Order By',
        name: 'orderBy',
        type: 'options',
        default: 'ASC',
        options: [
          { name: 'Ascending', value: 'ASC' },
          { name: 'Descending', value: 'DESC' },
        ],
        description: 'Sort order for results',
      },
    ],
  },
];

export async function execute(this: IExecuteFunctions, index: number): Promise<unknown> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  const filters = this.getNodeParameter('filters', index, {}) as {
    namePrefix?: string;
    nameSuffix?: string;
    minAmountThreshold?: number;
    assetId?: string;
    orderBy?: string;
  };

  const qs: Record<string, string | number | boolean | undefined> = {
    namePrefix: filters.namePrefix,
    nameSuffix: filters.nameSuffix,
    minAmountThreshold: filters.minAmountThreshold,
    assetId: filters.assetId,
    orderBy: filters.orderBy,
  };

  if (returnAll) {
    return fireblocksApiRequestAllItems.call(
      this,
      {
        method: 'GET',
        endpoint: '/vault/accounts_paged',
        qs,
      },
      'accounts',
    );
  }

  const limit = this.getNodeParameter('limit', index) as number;
  qs.limit = limit;

  const response = await fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: '/vault/accounts_paged',
    qs,
  });

  return (response as { accounts: unknown[] }).accounts || [];
}
