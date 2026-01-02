/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const getActiveDescription: INodeProperties[] = [];

export const getDraftDescription: INodeProperties[] = [];

export const updateDraftDescription: INodeProperties[] = [
  {
    displayName: 'Policy Rules (JSON)',
    name: 'policyRules',
    type: 'json',
    required: true,
    default: '[]',
    description: 'JSON array of TAP policy rules',
    displayOptions: { show: { resource: ['policy'], operation: ['updateDraft'] } },
  },
];

export const publishDraftDescription: INodeProperties[] = [];

export async function executeGetActive(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/tap/active_policy' });
}

export async function executeGetDraft(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/tap/draft' });
}

export async function executeUpdateDraft(this: IExecuteFunctions, index: number): Promise<unknown> {
  const policyRulesJson = this.getNodeParameter('policyRules', index) as string;
  let rules: unknown[];
  try {
    rules = JSON.parse(policyRulesJson);
  } catch {
    throw new Error('Invalid JSON for policy rules');
  }
  return fireblocksApiRequest.call(this, {
    method: 'PUT',
    endpoint: '/tap/draft',
    body: { rules },
  });
}

export async function executePublishDraft(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'POST', endpoint: '/tap/publish' });
}
