/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';

export const listTemplatesDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['smartContract'], operation: ['listTemplates'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['smartContract'], operation: ['listTemplates'], returnAll: [false] } },
	},
];

export const uploadTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Template name',
		displayOptions: { show: { resource: ['smartContract'], operation: ['uploadTemplate'] } },
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Template description',
		displayOptions: { show: { resource: ['smartContract'], operation: ['uploadTemplate'] } },
	},
	{
		displayName: 'ABI (JSON)',
		name: 'abi',
		type: 'json',
		required: true,
		default: '[]',
		description: 'The contract ABI as JSON array',
		displayOptions: { show: { resource: ['smartContract'], operation: ['uploadTemplate'] } },
	},
	{
		displayName: 'Bytecode',
		name: 'bytecode',
		type: 'string',
		required: true,
		default: '',
		description: 'The compiled contract bytecode (hex)',
		displayOptions: { show: { resource: ['smartContract'], operation: ['uploadTemplate'] } },
	},
];

export const getTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract template ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getTemplate'] } },
	},
];

export const deleteTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract template ID to delete',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deleteTemplate'] } },
	},
];

export const getConstructorDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract template ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getConstructor'] } },
	},
];

export const getFunctionAbiDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract template ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getFunctionAbi'] } },
	},
	{
		displayName: 'Function Name',
		name: 'functionName',
		type: 'string',
		required: true,
		default: '',
		description: 'The function name to get ABI for',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getFunctionAbi'] } },
	},
];

export const deployDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract template ID to deploy',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deploy'] } },
	},
	{
		displayName: 'Vault Account ID',
		name: 'vaultAccountId',
		type: 'string',
		required: true,
		default: '',
		description: 'Source vault account ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deploy'] } },
	},
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: 'ETH',
		description: 'Asset ID for gas payment',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deploy'] } },
	},
	{
		displayName: 'Constructor Parameters (JSON)',
		name: 'constructorParams',
		type: 'json',
		default: '[]',
		description: 'Constructor parameters as JSON array',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deploy'] } },
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
		description: 'Fee level for deployment',
		displayOptions: { show: { resource: ['smartContract'], operation: ['deploy'] } },
	},
];

export const listDeployedDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['smartContract'], operation: ['listDeployed'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['smartContract'], operation: ['listDeployed'], returnAll: [false] } },
	},
];

export const getDeployedDescription: INodeProperties[] = [
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		default: '',
		description: 'The deployed contract ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getDeployed'] } },
	},
];

export const fetchAbiDescription: INodeProperties[] = [
	{
		displayName: 'Blockchain Descriptor',
		name: 'blockchainDescriptor',
		type: 'string',
		required: true,
		default: 'ETH',
		description: 'The blockchain where the contract is deployed',
		displayOptions: { show: { resource: ['smartContract'], operation: ['fetchAbi'] } },
	},
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract address',
		displayOptions: { show: { resource: ['smartContract'], operation: ['fetchAbi'] } },
	},
];

export const saveAbiDescription: INodeProperties[] = [
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract address',
		displayOptions: { show: { resource: ['smartContract'], operation: ['saveAbi'] } },
	},
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: 'ETH',
		description: 'The asset ID (blockchain)',
		displayOptions: { show: { resource: ['smartContract'], operation: ['saveAbi'] } },
	},
	{
		displayName: 'ABI (JSON)',
		name: 'abi',
		type: 'json',
		required: true,
		default: '[]',
		description: 'The contract ABI as JSON array',
		displayOptions: { show: { resource: ['smartContract'], operation: ['saveAbi'] } },
	},
];

export const readContractDescription: INodeProperties[] = [
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract address',
		displayOptions: { show: { resource: ['smartContract'], operation: ['readContract'] } },
	},
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: 'ETH',
		description: 'The asset ID (blockchain)',
		displayOptions: { show: { resource: ['smartContract'], operation: ['readContract'] } },
	},
	{
		displayName: 'Function Name',
		name: 'functionName',
		type: 'string',
		required: true,
		default: '',
		description: 'Function name to call',
		displayOptions: { show: { resource: ['smartContract'], operation: ['readContract'] } },
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parameters',
		type: 'json',
		default: '[]',
		description: 'Function parameters as JSON array',
		displayOptions: { show: { resource: ['smartContract'], operation: ['readContract'] } },
	},
];

export const writeContractDescription: INodeProperties[] = [
	{
		displayName: 'Vault Account ID',
		name: 'vaultAccountId',
		type: 'string',
		required: true,
		default: '',
		description: 'Source vault account ID',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		required: true,
		default: '',
		description: 'The contract address',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: 'ETH',
		description: 'The asset ID (blockchain)',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
	{
		displayName: 'Function Name',
		name: 'functionName',
		type: 'string',
		required: true,
		default: '',
		description: 'Function name to call',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parameters',
		type: 'json',
		default: '[]',
		description: 'Function parameters as JSON array',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		default: '0',
		description: 'Amount to send with transaction (for payable functions)',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
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
		description: 'Fee level for transaction',
		displayOptions: { show: { resource: ['smartContract'], operation: ['writeContract'] } },
	},
];

export const getReceiptDescription: INodeProperties[] = [
	{
		displayName: 'Transaction ID',
		name: 'txId',
		type: 'string',
		required: true,
		default: '',
		description: 'The transaction ID to get receipt for',
		displayOptions: { show: { resource: ['smartContract'], operation: ['getReceipt'] } },
	},
];

export async function executeListTemplates(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/contract_templates' }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/contract_templates', qs: { limit: String(limit) } });
}

export async function executeUploadTemplate(this: IExecuteFunctions, index: number): Promise<unknown> {
	const name = this.getNodeParameter('name', index) as string;
	const description = this.getNodeParameter('description', index, '') as string;
	const abi = this.getNodeParameter('abi', index) as string;
	const bytecode = this.getNodeParameter('bytecode', index) as string;

	const body: Record<string, unknown> = {
		name,
		abi: typeof abi === 'string' ? JSON.parse(abi) : abi,
		bytecode,
	};
	if (description) body.description = description;

	return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/contract_templates', body });
}

export async function executeGetTemplate(this: IExecuteFunctions, index: number): Promise<unknown> {
	const templateId = this.getNodeParameter('templateId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/contract_templates/${templateId}` });
}

export async function executeDeleteTemplate(this: IExecuteFunctions, index: number): Promise<unknown> {
	const templateId = this.getNodeParameter('templateId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/contract_templates/${templateId}` });
}

export async function executeGetConstructor(this: IExecuteFunctions, index: number): Promise<unknown> {
	const templateId = this.getNodeParameter('templateId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/contract_templates/${templateId}/constructor` });
}

export async function executeGetFunctionAbi(this: IExecuteFunctions, index: number): Promise<unknown> {
	const templateId = this.getNodeParameter('templateId', index) as string;
	const functionName = this.getNodeParameter('functionName', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/contract_templates/${templateId}/functions/${functionName}` });
}

export async function executeDeploy(this: IExecuteFunctions, index: number): Promise<unknown> {
	const templateId = this.getNodeParameter('templateId', index) as string;
	const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
	const assetId = this.getNodeParameter('assetId', index) as string;
	const constructorParams = this.getNodeParameter('constructorParams', index, '[]') as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: `/contract_templates/${templateId}/deploy`,
		body: {
			vaultAccountId,
			assetId,
			constructorParameters: typeof constructorParams === 'string' ? JSON.parse(constructorParams) : constructorParams,
			feeLevel,
		},
	});
}

export async function executeListDeployed(this: IExecuteFunctions, index: number): Promise<unknown> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	if (returnAll) {
		return fireblocksApiRequestAllItems.call(this, { method: 'GET', endpoint: '/contracts' }, 'data');
	}
	const limit = this.getNodeParameter('limit', index) as number;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/contracts', qs: { limit: String(limit) } });
}

export async function executeGetDeployed(this: IExecuteFunctions, index: number): Promise<unknown> {
	const contractId = this.getNodeParameter('contractId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/contracts/${contractId}` });
}

export async function executeFetchAbi(this: IExecuteFunctions, index: number): Promise<unknown> {
	const blockchainDescriptor = this.getNodeParameter('blockchainDescriptor', index) as string;
	const contractAddress = this.getNodeParameter('contractAddress', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'GET',
		endpoint: `/contract_abi/${blockchainDescriptor}/${contractAddress}`,
	});
}

export async function executeSaveAbi(this: IExecuteFunctions, index: number): Promise<unknown> {
	const contractAddress = this.getNodeParameter('contractAddress', index) as string;
	const assetId = this.getNodeParameter('assetId', index) as string;
	const abi = this.getNodeParameter('abi', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: '/contract_interactions/abi',
		body: {
			contractAddress,
			assetId,
			abi: typeof abi === 'string' ? JSON.parse(abi) : abi,
		},
	});
}

export async function executeReadContract(this: IExecuteFunctions, index: number): Promise<unknown> {
	const contractAddress = this.getNodeParameter('contractAddress', index) as string;
	const assetId = this.getNodeParameter('assetId', index) as string;
	const functionName = this.getNodeParameter('functionName', index) as string;
	const parameters = this.getNodeParameter('parameters', index, '[]') as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: '/contract_interactions/read',
		body: {
			contractAddress,
			assetId,
			function: functionName,
			parameters: typeof parameters === 'string' ? JSON.parse(parameters) : parameters,
		},
	});
}

export async function executeWriteContract(this: IExecuteFunctions, index: number): Promise<unknown> {
	const vaultAccountId = this.getNodeParameter('vaultAccountId', index) as string;
	const contractAddress = this.getNodeParameter('contractAddress', index) as string;
	const assetId = this.getNodeParameter('assetId', index) as string;
	const functionName = this.getNodeParameter('functionName', index) as string;
	const parameters = this.getNodeParameter('parameters', index, '[]') as string;
	const amount = this.getNodeParameter('amount', index, '0') as string;
	const feeLevel = this.getNodeParameter('feeLevel', index) as string;

	return fireblocksApiRequest.call(this, {
		method: 'POST',
		endpoint: '/contract_interactions/write',
		body: {
			vaultAccountId,
			contractAddress,
			assetId,
			function: functionName,
			parameters: typeof parameters === 'string' ? JSON.parse(parameters) : parameters,
			amount,
			feeLevel,
		},
	});
}

export async function executeGetReceipt(this: IExecuteFunctions, index: number): Promise<unknown> {
	const txId = this.getNodeParameter('txId', index) as string;
	return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/transactions/${txId}/receipt` });
}
