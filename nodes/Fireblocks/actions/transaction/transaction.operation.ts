/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest, fireblocksApiRequestAllItems } from '../../transport';
import { TRANSACTION_STATUS_OPTIONS, FEE_LEVEL_OPTIONS, TRANSACTION_OPERATION_OPTIONS } from '../../constants';
import { PEER_TYPE_OPTIONS } from '../../constants/peerTypes';

export const listDescription: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: {
      show: {
        resource: ['transaction'],
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
        resource: ['transaction'],
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
        resource: ['transaction'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        default: '',
        options: [{ name: 'All', value: '' }, ...TRANSACTION_STATUS_OPTIONS],
        description: 'Filter by transaction status',
      },
      {
        displayName: 'Source Type',
        name: 'sourceType',
        type: 'options',
        default: '',
        options: [{ name: 'All', value: '' }, ...PEER_TYPE_OPTIONS],
        description: 'Filter by source type',
      },
      {
        displayName: 'Source ID',
        name: 'sourceId',
        type: 'string',
        default: '',
        description: 'Filter by source ID',
      },
      {
        displayName: 'Destination Type',
        name: 'destType',
        type: 'options',
        default: '',
        options: [{ name: 'All', value: '' }, ...PEER_TYPE_OPTIONS],
        description: 'Filter by destination type',
      },
      {
        displayName: 'Destination ID',
        name: 'destId',
        type: 'string',
        default: '',
        description: 'Filter by destination ID',
      },
      {
        displayName: 'Asset ID',
        name: 'assets',
        type: 'string',
        default: '',
        description: 'Filter by asset ID (comma-separated for multiple)',
      },
      {
        displayName: 'TX Hash',
        name: 'txHash',
        type: 'string',
        default: '',
        description: 'Filter by blockchain transaction hash',
      },
      {
        displayName: 'After Date',
        name: 'after',
        type: 'dateTime',
        default: '',
        description: 'Filter transactions after this date',
      },
      {
        displayName: 'Before Date',
        name: 'before',
        type: 'dateTime',
        default: '',
        description: 'Filter transactions before this date',
      },
      {
        displayName: 'Order By',
        name: 'orderBy',
        type: 'options',
        default: 'createdAt',
        options: [
          { name: 'Created At', value: 'createdAt' },
          { name: 'Last Updated', value: 'lastUpdated' },
        ],
        description: 'Field to sort by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort',
        type: 'options',
        default: 'DESC',
        options: [
          { name: 'Descending', value: 'DESC' },
          { name: 'Ascending', value: 'ASC' },
        ],
        description: 'Sort order',
      },
    ],
  },
];

export const getDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['get'],
      },
    },
  },
];

export const getByExternalIdDescription: INodeProperties[] = [
  {
    displayName: 'External Transaction ID',
    name: 'externalTxId',
    type: 'string',
    required: true,
    default: '',
    description: 'The external transaction ID',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['getByExternalId'],
      },
    },
  },
];

export const createDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'BTC, ETH, USDT_ERC20...',
    description: 'The asset to transfer',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'string',
    required: true,
    default: '',
    description: 'Amount to transfer (as string to preserve precision)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Source Type',
    name: 'sourceType',
    type: 'options',
    required: true,
    default: 'VAULT_ACCOUNT',
    options: PEER_TYPE_OPTIONS,
    description: 'The type of the source',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Source ID',
    name: 'sourceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the source (vault account ID, exchange ID, etc.)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Destination Type',
    name: 'destinationType',
    type: 'options',
    required: true,
    default: 'VAULT_ACCOUNT',
    options: PEER_TYPE_OPTIONS,
    description: 'The type of the destination',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Destination ID',
    name: 'destinationId',
    type: 'string',
    default: '',
    description: 'The ID of the destination (not required for ONE_TIME_ADDRESS)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'One-Time Address',
    name: 'oneTimeAddress',
    type: 'string',
    default: '',
    description: 'The destination address (required for ONE_TIME_ADDRESS destination type)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
        destinationType: ['ONE_TIME_ADDRESS'],
      },
    },
  },
  {
    displayName: 'Address Tag',
    name: 'addressTag',
    type: 'string',
    default: '',
    description: 'Tag/memo for the destination address (for XRP, XLM, etc.)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['create'],
        destinationType: ['ONE_TIME_ADDRESS'],
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
        resource: ['transaction'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        default: 'TRANSFER',
        options: TRANSACTION_OPERATION_OPTIONS,
        description: 'Transaction operation type',
      },
      {
        displayName: 'Fee Level',
        name: 'feeLevel',
        type: 'options',
        default: 'MEDIUM',
        options: FEE_LEVEL_OPTIONS,
        description: 'Fee level for the transaction',
      },
      {
        displayName: 'Max Fee',
        name: 'maxFee',
        type: 'string',
        default: '',
        description: 'Maximum fee willing to pay (in native asset units)',
      },
      {
        displayName: 'Gas Limit',
        name: 'gasLimit',
        type: 'string',
        default: '',
        description: 'Gas limit for EVM transactions',
      },
      {
        displayName: 'Gas Price',
        name: 'gasPrice',
        type: 'string',
        default: '',
        description: 'Gas price in Gwei for EVM transactions',
      },
      {
        displayName: 'Priority Fee',
        name: 'priorityFee',
        type: 'string',
        default: '',
        description: 'Priority fee for EIP-1559 transactions',
      },
      {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        default: '',
        description: 'Internal note for the transaction',
      },
      {
        displayName: 'Customer Reference ID',
        name: 'customerRefId',
        type: 'string',
        default: '',
        description: 'Customer reference ID for AML/KYT',
      },
      {
        displayName: 'External Transaction ID',
        name: 'externalTxId',
        type: 'string',
        default: '',
        description: 'External transaction ID for idempotency',
      },
      {
        displayName: 'Treat As Gross Amount',
        name: 'treatAsGrossAmount',
        type: 'boolean',
        default: false,
        description: 'Whether the amount includes fees (true) or fees are additional (false)',
      },
      {
        displayName: 'Force Sweep',
        name: 'forceSweep',
        type: 'boolean',
        default: false,
        description: 'Whether to force sweep all funds',
      },
      {
        displayName: 'Auto Staking',
        name: 'autoStaking',
        type: 'boolean',
        default: false,
        description: 'Whether to auto-stake the transferred funds',
      },
    ],
  },
];

export const estimateFeeDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to estimate fees for',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'string',
    required: true,
    default: '',
    description: 'Amount for fee estimation',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
  {
    displayName: 'Source Type',
    name: 'sourceType',
    type: 'options',
    required: true,
    default: 'VAULT_ACCOUNT',
    options: PEER_TYPE_OPTIONS,
    description: 'The type of the source',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
  {
    displayName: 'Source ID',
    name: 'sourceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the source',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
  {
    displayName: 'Destination Type',
    name: 'destinationType',
    type: 'options',
    default: 'VAULT_ACCOUNT',
    options: PEER_TYPE_OPTIONS,
    description: 'The type of the destination',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
  {
    displayName: 'Destination ID',
    name: 'destinationId',
    type: 'string',
    default: '',
    description: 'The ID of the destination',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['estimateFee'],
      },
    },
  },
];

export const cancelDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID to cancel',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['cancel'],
      },
    },
  },
];

export const freezeDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID to freeze',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['freeze'],
      },
    },
  },
];

export const unfreezeDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID to unfreeze',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['unfreeze'],
      },
    },
  },
];

export const dropDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID to drop/replace',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['drop'],
      },
    },
  },
  {
    displayName: 'Fee Level',
    name: 'feeLevel',
    type: 'options',
    default: 'HIGH',
    options: FEE_LEVEL_OPTIONS,
    description: 'Fee level for the replacement transaction',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['drop'],
      },
    },
  },
];

export const setConfirmationThresholdDescription: INodeProperties[] = [
  {
    displayName: 'Transaction ID',
    name: 'txId',
    type: 'string',
    required: true,
    default: '',
    description: 'The Fireblocks transaction ID',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['setConfirmationThreshold'],
      },
    },
  },
  {
    displayName: 'Required Confirmations',
    name: 'numOfConfirmations',
    type: 'number',
    required: true,
    default: 6,
    description: 'Number of confirmations required',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['setConfirmationThreshold'],
      },
    },
  },
];

export const validateAddressDescription: INodeProperties[] = [
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    default: '',
    description: 'The asset ID to validate the address for',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['validateAddress'],
      },
    },
  },
  {
    displayName: 'Address',
    name: 'address',
    type: 'string',
    required: true,
    default: '',
    description: 'The address to validate',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['validateAddress'],
      },
    },
  },
];

export async function executeList(this: IExecuteFunctions, index: number): Promise<unknown> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  const filters = this.getNodeParameter('filters', index, {}) as Record<string, unknown>;

  const qs: Record<string, string | number | boolean | undefined> = {};
  
  if (filters.status) qs.status = filters.status as string;
  if (filters.sourceType) qs.sourceType = filters.sourceType as string;
  if (filters.sourceId) qs.sourceId = filters.sourceId as string;
  if (filters.destType) qs.destType = filters.destType as string;
  if (filters.destId) qs.destId = filters.destId as string;
  if (filters.assets) qs.assets = filters.assets as string;
  if (filters.txHash) qs.txHash = filters.txHash as string;
  if (filters.after) qs.after = new Date(filters.after as string).getTime();
  if (filters.before) qs.before = new Date(filters.before as string).getTime();
  if (filters.orderBy) qs.orderBy = filters.orderBy as string;
  if (filters.sort) qs.sort = filters.sort as string;

  if (returnAll) {
    return fireblocksApiRequestAllItems.call(this, {
      method: 'GET',
      endpoint: '/transactions',
      qs,
    });
  }

  const limit = this.getNodeParameter('limit', index) as number;
  qs.limit = limit;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: '/transactions',
    qs,
  });
}

export async function executeGet(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/transactions/${txId}`,
  });
}

export async function executeGetByExternalId(this: IExecuteFunctions, index: number): Promise<unknown> {
  const externalTxId = this.getNodeParameter('externalTxId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/transactions/external_tx_id/${externalTxId}`,
  });
}

export async function executeCreate(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const amount = this.getNodeParameter('amount', index) as string;
  const sourceType = this.getNodeParameter('sourceType', index) as string;
  const sourceId = this.getNodeParameter('sourceId', index) as string;
  const destinationType = this.getNodeParameter('destinationType', index) as string;
  const destinationId = this.getNodeParameter('destinationId', index, '') as string;
  const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as Record<string, unknown>;

  const body: Record<string, unknown> = {
    assetId,
    amount,
    source: {
      type: sourceType,
      id: sourceId,
    },
    destination: {
      type: destinationType,
    },
  };

  if (destinationType === 'ONE_TIME_ADDRESS') {
    const oneTimeAddress = this.getNodeParameter('oneTimeAddress', index) as string;
    const addressTag = this.getNodeParameter('addressTag', index, '') as string;
    (body.destination as Record<string, unknown>).oneTimeAddress = {
      address: oneTimeAddress,
      tag: addressTag || undefined,
    };
  } else if (destinationId) {
    (body.destination as Record<string, unknown>).id = destinationId;
  }

  // Add additional options
  if (additionalOptions.operation) body.operation = additionalOptions.operation;
  if (additionalOptions.feeLevel) body.feeLevel = additionalOptions.feeLevel;
  if (additionalOptions.maxFee) body.maxFee = additionalOptions.maxFee;
  if (additionalOptions.gasLimit) body.gasLimit = additionalOptions.gasLimit;
  if (additionalOptions.gasPrice) body.gasPrice = additionalOptions.gasPrice;
  if (additionalOptions.priorityFee) body.priorityFee = additionalOptions.priorityFee;
  if (additionalOptions.note) body.note = additionalOptions.note;
  if (additionalOptions.customerRefId) body.customerRefId = additionalOptions.customerRefId;
  if (additionalOptions.externalTxId) body.externalTxId = additionalOptions.externalTxId;
  if (additionalOptions.treatAsGrossAmount !== undefined) body.treatAsGrossAmount = additionalOptions.treatAsGrossAmount;
  if (additionalOptions.forceSweep !== undefined) body.forceSweep = additionalOptions.forceSweep;
  if (additionalOptions.autoStaking !== undefined) body.autoStaking = additionalOptions.autoStaking;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: '/transactions',
    body,
  });
}

export async function executeEstimateFee(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const amount = this.getNodeParameter('amount', index) as string;
  const sourceType = this.getNodeParameter('sourceType', index) as string;
  const sourceId = this.getNodeParameter('sourceId', index) as string;
  const destinationType = this.getNodeParameter('destinationType', index) as string;
  const destinationId = this.getNodeParameter('destinationId', index, '') as string;

  const body: Record<string, unknown> = {
    assetId,
    amount,
    source: {
      type: sourceType,
      id: sourceId,
    },
    destination: {
      type: destinationType,
      id: destinationId || undefined,
    },
  };

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: '/transactions/estimate_fee',
    body,
  });
}

export async function executeCancel(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/transactions/${txId}/cancel`,
  });
}

export async function executeFreeze(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/transactions/${txId}/freeze`,
  });
}

export async function executeUnfreeze(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/transactions/${txId}/unfreeze`,
  });
}

export async function executeDrop(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;
  const feeLevel = this.getNodeParameter('feeLevel', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/transactions/${txId}/drop`,
    body: { feeLevel },
  });
}

export async function executeSetConfirmationThreshold(this: IExecuteFunctions, index: number): Promise<unknown> {
  const txId = this.getNodeParameter('txId', index) as string;
  const numOfConfirmations = this.getNodeParameter('numOfConfirmations', index) as number;

  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: `/transactions/${txId}/set_confirmation_threshold`,
    body: { numOfConfirmations },
  });
}

export async function executeValidateAddress(this: IExecuteFunctions, index: number): Promise<unknown> {
  const assetId = this.getNodeParameter('assetId', index) as string;
  const address = this.getNodeParameter('address', index) as string;

  return fireblocksApiRequest.call(this, {
    method: 'GET',
    endpoint: `/transactions/validate_address/${assetId}/${address}`,
  });
}
