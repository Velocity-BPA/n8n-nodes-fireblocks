/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const listChainsDescription: INodeProperties[] = [];

export const getChainInfoDescription: INodeProperties[] = [
	{
		displayName: 'Chain Descriptor',
		name: 'chainDescriptor',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'ETH, SOL, DOT...',
		description: 'The chain descriptor for staking',
		displayOptions: { show: { resource: ['staking'], operation: ['getChainInfo'] } },
	},
];

export const stakeDescription: INodeProperties[] = [
	{
		displayName: 'Chain Descriptor',
		name: 'chainDescriptor',
		type: 'string',
		required: true,
		default: '',
		description: 'The chain to stake on',
		displayOptions: { show: { resource: ['staking'], operation: ['stake'] } },
	},
	{
		displayName: 'Vault Account ID',
		name: 'vaultAccountId',
		type: 'string',
		required: true,
		default: '',
		description: 'The vault account ID to stake from',
		displayOptions: { show: { resource: ['staking'], operation: ['stake'] } },
	},
	{
		displayName: 'Provider ID',
		name: 'providerId',
		type: 'string',
		required: true,
		default: '',
		description: 'The staking provider/validator ID',
		displayOptions: { show: { resource: ['staking'], operation: ['stake'] } },
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		description: 'Amount to stake',
		displayOptions: { show: { resource: ['staking'], operation: ['stake'] } },
	},
	{
		displayName: 'Fee Level',
		name: 'feeLevel',
		type: 'options',
		default: 'MEDIUM',
		options: [
			{ name: 'Low', value: 'LOW' },
			{ name: 'Medium', value: 'MEDIUM' },
			{ name: 'High', value: 'HIGH' },
		],
		description: 'Fee level for the transaction',
		displayOptions: { show: { resource: ['staking'], operation: ['stake'] } },
	},
];

export const unstakeDescription: INodeProperties[] = [
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The staking position ID to unstake',
		displayOptions: { show: { resource: ['staking'], operation: ['unstake'] } },
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		default: '',
		description: 'Amount to unstake (leave empty for full unstake)',
		displayOptions: { show: { resource: ['staking'], operation: ['unstake'] } },
	},
	{
		displayName: 'Fee Level',
		name: 'feeLevel',
		type: 'options',
		default: 'MEDIUM',
		options: [
			{ name: 'Low', value: 'LOW' },
			{ name: 'Medium', value: 'MEDIUM' },
			{ name: 'High', value: 'HIGH' },
		],
		description: 'Fee level for the transaction',
		displayOptions: { show: { resource: ['staking'], operation: ['unstake'] } },
	},
];

export const withdrawDescription: INodeProperties[] = [
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The staking position ID to withdraw from',
		displayOptions: { show: { resource: ['staking'], operation: ['withdraw'] } },
	},
	{
		displayName: 'Fee Level',
		name: 'feeLevel',
		type: 'options',
		default: 'MEDIUM',
		options: [
			{ name: 'Low', value: 'LOW' },
			{ name: 'Medium', value: 'MEDIUM' },
			{ name: 'High', value: 'HIGH' },
		],
		description: 'Fee level for the transaction',
		displayOptions: { show: { resource: ['staking'], operation: ['withdraw'] } },
	},
];

export const claimRewardsDescription: INodeProperties[] = [
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The staking position ID to claim rewards from',
		displayOptions: { show: { resource: ['staking'], operation: ['claimRewards'] } },
	},
	{
		displayName: 'Fee Level',
		name: 'feeLevel',
		type: 'options',
		default: 'MEDIUM',
		options: [
			{ name: 'Low', value: 'LOW' },
			{ name: 'Medium', value: 'MEDIUM' },
			{ name: 'High', value: 'HIGH' },
		],
		description: 'Fee level for the transaction',
		displayOptions: { show: { resource: ['staking'], operation: ['claimRewards'] } },
	},
];

export const listPositionsDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['staking'], operation: ['listPositions'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
		displayOptions: { show: { resource: ['staking'], operation: ['listPositions'], returnAll: [false] } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['staking'], operation: ['listPositions'] } },
		options: [
			{
				displayName: 'Chain Descriptor',
				name: 'chainDescriptor',
				type: 'string',
				default: '',
				description: 'Filter by chain',
			},
			{
				displayName: 'Vault Account IDs',
				name: 'vaultAccountIds',
				type: 'string',
				default: '',
				description: 'Comma-separated vault account IDs to filter by',
			},
			{
				displayName: 'Provider ID',
				name: 'providerId',
				type: 'string',
				default: '',
				description: 'Filter by staking provider',
			},
		],
	},
];

export const getPositionDescription: INodeProperties[] = [
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The staking position ID',
		displayOptions: { show: { resource: ['staking'], operation: ['getPosition'] } },
	},
];

export const getPositionsSummaryDescription: INodeProperties[] = [];

export const listProvidersDescription: INodeProperties[] = [
	{
		displayName: 'Chain Descriptor',
		name: 'chainDescriptor',
		type: 'string',
		required: true,
		default: '',
		description: 'The chain to get providers for',
		displayOptions: { show: { resource: ['staking'], operation: ['listProviders'] } },
	},
];

export async function executeListChains(this: IExecuteFunctions): Promise<unknown> {
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/staking/chains' });
}

export async function executeGetChainInfo(this: IExecuteFunctions, index: number): Promise<unknown> {
	const chainDescriptor = this.getNodeParameter('chainDescriptor', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/staking/chains/${chainDescriptor}` });
}

export async function executeStake(this: IExecuteFunctions, index: number): Promise<unknown> {
	const chainDescriptor = this.getNodeParameter('chainDescriptor', index) as string;
	const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
	const providerId = this.getNodeParameter('providerId', index) as string;
	const amount = this.getNodeParameter('amount', index) as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: `/staking/chains/${chainDescriptor}/stake`,
		body: {
			vaultAccountId,
			providerId,
			stakeAmount: amount,
			feeLevel,
		},
	});
}

export async function executeUnstake(this: IExecuteFunctions, index: number): Promise<unknown> {
	const positionId = this.getNodeParameter('positionId', index) as string;
	const amount = this.getNodeParameter('amount', index, '') as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	const body: Record<string, string> = { feeLevel };
	if (amount) body.amount = amount;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: `/staking/positions/${positionId}/unstake`,
		body,
	});
}

export async function executeWithdraw(this: IExecuteFunctions, index: number): Promise<unknown> {
	const positionId = this.getNodeParameter('positionId', index) as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: `/staking/positions/${positionId}/withdraw`,
		body: { feeLevel },
	});
}

export async function executeClaimRewards(this: IExecuteFunctions, index: number): Promise<unknown> {
	const positionId = this.getNodeParameter('positionId', index) as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: `/staking/positions/${positionId}/claim`,
		body: { feeLevel },
	});
}

export async function executeListPositions(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as {
		chainDescriptor?: string;
		vaultAccountIds?: string;
		providerId?: string;
	};

	const qs: Record<string, string> = {};
	if (filters.chainDescriptor) qs.chainDescriptor = filters.chainDescriptor;
	if (filters.vaultAccountIds) qs.vaultAccountIds = filters.vaultAccountIds;
	if (filters.providerId) qs.providerId = filters.providerId;

	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/staking/positions', qs }, 'positions');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	qs.limit = String(limit);
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/staking/positions', qs });
}

export async function executeGetPosition(this: IExecuteFunctions, index: number): Promise<unknown> {
	const positionId = this.getNodeParameter('positionId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/staking/positions/${positionId}` });
}

export async function executeGetPositionsSummary(this: IExecuteFunctions): Promise<unknown> {
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/staking/positions/summary' });
}

export async function executeListProviders(this: IExecuteFunctions, index: number): Promise<unknown> {
	const chainDescriptor = this.getNodeParameter('chainDescriptor', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/staking/providers`, qs: { chainDescriptor } });
}
