/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const listConnectionsDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['listConnections'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['networkConnection'], operation: ['listConnections'], returnAll: [false] } },
	},
];

export const createConnectionDescription: INodeProperties[] = [
	{
		displayName: 'Local Network ID',
		name: 'localNetworkId',
		type: 'string',
		required: true,
		default: '',
		description: 'Your local network ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['createConnection'] } },
	},
	{
		displayName: 'Remote Network ID',
		name: 'remoteNetworkId',
		type: 'string',
		required: true,
		default: '',
		description: 'The remote network ID to connect to',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['createConnection'] } },
	},
	{
		displayName: 'Routing Policy (JSON)',
		name: 'routingPolicy',
		type: 'json',
		default: '{}',
		description: 'Optional routing policy as JSON',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['createConnection'] } },
	},
];

export const getConnectionDescription: INodeProperties[] = [
	{
		displayName: 'Connection ID',
		name: 'connectionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network connection ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['getConnection'] } },
	},
];

export const deleteConnectionDescription: INodeProperties[] = [
	{
		displayName: 'Connection ID',
		name: 'connectionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network connection ID to delete',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['deleteConnection'] } },
	},
];

export const updateRoutingPolicyDescription: INodeProperties[] = [
	{
		displayName: 'Connection ID',
		name: 'connectionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network connection ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['updateRoutingPolicy'] } },
	},
	{
		displayName: 'Routing Policy (JSON)',
		name: 'routingPolicy',
		type: 'json',
		required: true,
		default: '{}',
		description: 'New routing policy as JSON object',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['updateRoutingPolicy'] } },
	},
];

export const listNetworkIdsDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['listNetworkIds'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['networkConnection'], operation: ['listNetworkIds'], returnAll: [false] } },
	},
];

export const createNetworkIdDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name for the network ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['createNetworkId'] } },
	},
	{
		displayName: 'Routing Policy (JSON)',
		name: 'routingPolicy',
		type: 'json',
		default: '{}',
		description: 'Optional routing policy as JSON',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['createNetworkId'] } },
	},
];

export const getNetworkIdDescription: INodeProperties[] = [
	{
		displayName: 'Network ID',
		name: 'networkId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['getNetworkId'] } },
	},
];

export const deleteNetworkIdDescription: INodeProperties[] = [
	{
		displayName: 'Network ID',
		name: 'networkId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network ID to delete',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['deleteNetworkId'] } },
	},
];

export const setRoutingPolicyDescription: INodeProperties[] = [
	{
		displayName: 'Network ID',
		name: 'networkId',
		type: 'string',
		required: true,
		default: '',
		description: 'The network ID',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['setRoutingPolicy'] } },
	},
	{
		displayName: 'Routing Policy (JSON)',
		name: 'routingPolicy',
		type: 'json',
		required: true,
		default: '{}',
		description: 'Routing policy as JSON object',
		displayOptions: { show: { resource: ['networkConnection'], operation: ['setRoutingPolicy'] } },
	},
];

export async function executeListConnections(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/network_connections' }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/network_connections', qs: { limit: String(limit) } });
}

export async function executeCreateConnection(this: IExecuteFunctions, index: number): Promise<unknown> {
	const localNetworkId = this.getNodeParameter('localNetworkId', index) as string;
	const remoteNetworkId = this.getNodeParameter('remoteNetworkId', index) as string;
	const routingPolicy = this.getNodeParameter('routingPolicy', index, '{}') as string;

	const body: Record<string, unknown> = {
		localNetworkId,
		remoteNetworkId,
	};

	const policy = typeof routingPolicy === 'string' ? JSON.parse(routingPolicy) : routingPolicy;
	if (Object.keys(policy).length > 0) {
		body.routingPolicy = policy;
	}

	return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/network_connections', body });
}

export async function executeGetConnection(this: IExecuteFunctions, index: number): Promise<unknown> {
	const connectionId = this.getNodeParameter('connectionId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/network_connections/${connectionId}` });
}

export async function executeDeleteConnection(this: IExecuteFunctions, index: number): Promise<unknown> {
	const connectionId = this.getNodeParameter('connectionId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/network_connections/${connectionId}` });
}

export async function executeUpdateRoutingPolicy(this: IExecuteFunctions, index: number): Promise<unknown> {
	const connectionId = this.getNodeParameter('connectionId', index) as string;
	const routingPolicy = this.getNodeParameter('routingPolicy', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'PATCH',
		endpoint: `/network_connections/${connectionId}/set_routing_policy`,
		body: {
			routingPolicy: typeof routingPolicy === 'string' ? JSON.parse(routingPolicy) : routingPolicy,
		},
	});
}

export async function executeListNetworkIds(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/network_ids' }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/network_ids', qs: { limit: String(limit) } });
}

export async function executeCreateNetworkId(this: IExecuteFunctions, index: number): Promise<unknown> {
	const name = this.getNodeParameter('name', index) as string;
	const routingPolicy = this.getNodeParameter('routingPolicy', index, '{}') as string;

	const body: Record<string, unknown> = { name };

	const policy = typeof routingPolicy === 'string' ? JSON.parse(routingPolicy) : routingPolicy;
	if (Object.keys(policy).length > 0) {
		body.routingPolicy = policy;
	}

	return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/network_ids', body });
}

export async function executeGetNetworkId(this: IExecuteFunctions, index: number): Promise<unknown> {
	const networkId = this.getNodeParameter('networkId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/network_ids/${networkId}` });
}

export async function executeDeleteNetworkId(this: IExecuteFunctions, index: number): Promise<unknown> {
	const networkId = this.getNodeParameter('networkId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/network_ids/${networkId}` });
}

export async function executeSetRoutingPolicy(this: IExecuteFunctions, index: number): Promise<unknown> {
	const networkId = this.getNodeParameter('networkId', index) as string;
	const routingPolicy = this.getNodeParameter('routingPolicy', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'PATCH',
		endpoint: `/network_ids/${networkId}/set_routing_policy`,
		body: {
			routingPolicy: typeof routingPolicy === 'string' ? JSON.parse(routingPolicy) : routingPolicy,
		},
	});
}
