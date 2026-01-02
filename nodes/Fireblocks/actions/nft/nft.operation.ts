/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const refreshVaultTokensDescription: INodeProperties[] = [
	{
		displayName: 'Vault Account ID',
		name: 'vaultAccountId',
		type: 'string',
		required: true,
		default: '',
		description: 'The vault account ID to refresh NFTs for',
		displayOptions: { show: { resource: ['nft'], operation: ['refreshVaultTokens'] } },
	},
	{
		displayName: 'Blockchain Descriptor',
		name: 'blockchainDescriptor',
		type: 'string',
		default: '',
		placeholder: 'ETH, POLYGON...',
		description: 'Optional blockchain filter',
		displayOptions: { show: { resource: ['nft'], operation: ['refreshVaultTokens'] } },
	},
];

export const listOwnedTokensDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedTokens'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedTokens'], returnAll: [false] } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedTokens'] } },
		options: [
			{
				displayName: 'Vault Account IDs',
				name: 'vaultAccountIds',
				type: 'string',
				default: '',
				description: 'Comma-separated vault account IDs',
			},
			{
				displayName: 'Blockchain Descriptor',
				name: 'blockchainDescriptor',
				type: 'string',
				default: '',
				description: 'Filter by blockchain',
			},
			{
				displayName: 'Collection IDs',
				name: 'collectionIds',
				type: 'string',
				default: '',
				description: 'Comma-separated collection IDs',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated NFT IDs',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				default: 'blockchainDescriptor',
				options: [
					{ name: 'Blockchain', value: 'blockchainDescriptor' },
					{ name: 'Collection', value: 'collection' },
					{ name: 'Owning Vault', value: 'owningVaultAccount' },
				],
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				default: 'ASC',
				options: [
					{ name: 'Ascending', value: 'ASC' },
					{ name: 'Descending', value: 'DESC' },
				],
			},
			{
				displayName: 'Include Spam',
				name: 'spam',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Only Spam', value: 'true' },
					{ name: 'Exclude Spam', value: 'false' },
				],
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'LISTED',
				options: [
					{ name: 'Listed', value: 'LISTED' },
					{ name: 'Archived', value: 'ARCHIVED' },
				],
			},
		],
	},
];

export const listOwnedCollectionsDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedCollections'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedCollections'], returnAll: [false] } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['nft'], operation: ['listOwnedCollections'] } },
		options: [
			{
				displayName: 'Vault Account IDs',
				name: 'vaultAccountIds',
				type: 'string',
				default: '',
				description: 'Comma-separated vault account IDs',
			},
			{
				displayName: 'Blockchain Descriptor',
				name: 'blockchainDescriptor',
				type: 'string',
				default: '',
				description: 'Filter by blockchain',
			},
		],
	},
];

export const getDetailsDescription: INodeProperties[] = [
	{
		displayName: 'NFT ID',
		name: 'nftId',
		type: 'string',
		required: true,
		default: '',
		description: 'The NFT ID (format: blockchain_contractAddress_tokenId)',
		displayOptions: { show: { resource: ['nft'], operation: ['getDetails'] } },
	},
];

export const getByIdsDescription: INodeProperties[] = [
	{
		displayName: 'NFT IDs',
		name: 'ids',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated NFT IDs',
		displayOptions: { show: { resource: ['nft'], operation: ['getByIds'] } },
	},
];

export const refreshMetadataDescription: INodeProperties[] = [
	{
		displayName: 'NFT ID',
		name: 'nftId',
		type: 'string',
		required: true,
		default: '',
		description: 'The NFT ID to refresh metadata for',
		displayOptions: { show: { resource: ['nft'], operation: ['refreshMetadata'] } },
	},
];

export const updateOwnershipStatusDescription: INodeProperties[] = [
	{
		displayName: 'NFT ID',
		name: 'nftId',
		type: 'string',
		required: true,
		default: '',
		description: 'The NFT ID',
		displayOptions: { show: { resource: ['nft'], operation: ['updateOwnershipStatus'] } },
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		default: 'LISTED',
		options: [
			{ name: 'Listed', value: 'LISTED' },
			{ name: 'Archived', value: 'ARCHIVED' },
		],
		description: 'New ownership status',
		displayOptions: { show: { resource: ['nft'], operation: ['updateOwnershipStatus'] } },
	},
];

export const updateSpamStatusDescription: INodeProperties[] = [
	{
		displayName: 'NFT ID',
		name: 'nftId',
		type: 'string',
		required: true,
		default: '',
		description: 'The NFT ID',
		displayOptions: { show: { resource: ['nft'], operation: ['updateSpamStatus'] } },
	},
	{
		displayName: 'Is Spam',
		name: 'spam',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to mark as spam',
		displayOptions: { show: { resource: ['nft'], operation: ['updateSpamStatus'] } },
	},
];

export async function executeRefreshVaultTokens(this: IExecuteFunctions, index: number): Promise<unknown> {
	const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
	const blockchainDescriptor = this.getNodeParameter('blockchainDescriptor', index, '') as string;

	const qs: Record<string, string> = {};
	if (blockchainDescriptor) qs.blockchainDescriptor = blockchainDescriptor;

	return fireblocksApiRequest.call(this, {
		method: 'PUT',
		endpoint: `/vault/accounts/${vaultAccountId}/tokens`,
		qs,
	});
}

export async function executeListOwnedTokens(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as {
		vaultAccountIds?: string;
		blockchainDescriptor?: string;
		collectionIds?: string;
		ids?: string;
		sort?: string;
		order?: string;
		spam?: string;
		status?: string;
	};

	const qs: Record<string, string> = {};
	if (filters.vaultAccountIds) qs.vaultAccountIds = filters.vaultAccountIds;
	if (filters.blockchainDescriptor) qs.blockchainDescriptor = filters.blockchainDescriptor;
	if (filters.collectionIds) qs.collectionIds = filters.collectionIds;
	if (filters.ids) qs.ids = filters.ids;
	if (filters.sort) qs.sort = filters.sort;
	if (filters.order) qs.order = filters.order;
	if (filters.spam) qs.spam = filters.spam;
	if (filters.status) qs.status = filters.status;

	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/nfts/ownership/tokens', qs }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	qs.pageCursor = '';
	qs.pageSize = String(limit);
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/nfts/ownership/tokens', qs });
}

export async function executeListOwnedCollections(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as {
		vaultAccountIds?: string;
		blockchainDescriptor?: string;
	};

	const qs: Record<string, string> = {};
	if (filters.vaultAccountIds) qs.vaultAccountIds = filters.vaultAccountIds;
	if (filters.blockchainDescriptor) qs.blockchainDescriptor = filters.blockchainDescriptor;

	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/nfts/ownership/collections', qs }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	qs.pageCursor = '';
	qs.pageSize = String(limit);
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/nfts/ownership/collections', qs });
}

export async function executeGetDetails(this: IExecuteFunctions, index: number): Promise<unknown> {
	const nftId = this.getNodeParameter('nftId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/nfts/tokens/${nftId}` });
}

export async function executeGetByIds(this: IExecuteFunctions, index: number): Promise<unknown> {
	const ids = this.getNodeParameter('ids', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/nfts/tokens', qs: { ids } });
}

export async function executeRefreshMetadata(this: IExecuteFunctions, index: number): Promise<unknown> {
	const nftId = this.getNodeParameter('nftId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: `/nfts/tokens/${nftId}` });
}

export async function executeUpdateOwnershipStatus(this: IExecuteFunctions, index: number): Promise<unknown> {
	const nftId = this.getNodeParameter('nftId', index) as string;
	const status = this.getNodeParameter('status', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'PUT',
		endpoint: `/nfts/ownership/tokens/${nftId}/status`,
		body: { status },
	});
}

export async function executeUpdateSpamStatus(this: IExecuteFunctions, index: number): Promise<unknown> {
	const nftId = this.getNodeParameter('nftId', index) as string;
	const spam = this.getNodeParameter('spam', index) as boolean;

	return fireblocksApiRequest.call(this, {
		method: 'PUT',
		endpoint: `/nfts/tokens/${nftId}/spam`,
		body: { spam },
	});
}
