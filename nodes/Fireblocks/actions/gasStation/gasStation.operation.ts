/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const getSettingsDescription: INodeProperties[] = [];

export const getByAssetDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to get gas station settings for',
    displayOptions: { show: { resource: ['gasStation'], operation: ['getByAsset'] } },
  },
];

export const updateSettingsDescription: INodeProperties[] = [
  {
    displayName: 'Gas Threshold',
    name: 'gasThreshold',
    type: 'string',
    required: true,
    default: '',
    description: 'The gas threshold in ETH',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateSettings'] } },
  },
  {
    displayName: 'Gas Cap',
    name: 'gasCap',
    type: 'string',
    required: true,
    default: '',
    description: 'The gas cap in ETH',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateSettings'] } },
  },
  {
    displayName: 'Max Gas Price',
    name: 'maxGasPrice',
    type: 'string',
    default: '',
    description: 'Maximum gas price in Gwei',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateSettings'] } },
  },
];

export const updateByAssetDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to update gas station settings for',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateByAsset'] } },
  },
  {
    displayName: 'Gas Threshold',
    name: 'gasThreshold',
    type: 'string',
    required: true,
    default: '',
    description: 'The gas threshold',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateByAsset'] } },
  },
  {
    displayName: 'Gas Cap',
    name: 'gasCap',
    type: 'string',
    required: true,
    default: '',
    description: 'The gas cap',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateByAsset'] } },
  },
  {
    displayName: 'Max Gas Price',
    name: 'maxGasPrice',
    type: 'string',
    default: '',
    description: 'Maximum gas price',
    displayOptions: { show: { resource: ['gasStation'], operation: ['updateByAsset'] } },
  },
];

export async function executeGetSettings(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/gas_station' });
}

export async function executeGetByAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/gas_station/${assetId}` });
}

export async function executeUpdateSettings(this: IExecuteFunctions, index: number): Promise<unknown> {
  const gasThreshold = this.getNodeParameter('gasThreshold', index) as string;
  const gasCap = this.getNodeParameter('gasCap', index) as string;
  const maxGasPrice = this.getNodeParameter('maxGasPrice', index, '') as string;
  const body: Record<string, string> = { gasThreshold, gasCap };
  if (maxGasPrice) body.maxGasPrice = maxGasPrice;
  return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: '/gas_station/configuration', body });
}

export async function executeUpdateByAsset(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const gasThreshold = this.getNodeParameter('gasThreshold', index) as string;
  const gasCap = this.getNodeParameter('gasCap', index) as string;
  const maxGasPrice = this.getNodeParameter('maxGasPrice', index, '') as string;
  const body: Record<string, string> = { gasThreshold, gasCap };
  if (maxGasPrice) body.maxGasPrice = maxGasPrice;
  return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: `/gas_station/configuration/${assetId}`, body });
}
