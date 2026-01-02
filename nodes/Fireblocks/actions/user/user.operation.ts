/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { fireblocksApiRequest } from '../../transport';

export const listUsersDescription: INodeProperties[] = [];

export const listGroupsDescription: INodeProperties[] = [];

export const createGroupDescription: INodeProperties[] = [
  {
    displayName: 'Group Name',
    name: 'groupName',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the user group',
    displayOptions: { show: { resource: ['user'], operation: ['createGroup'] } },
  },
  {
    displayName: 'Member IDs',
    name: 'memberIds',
    type: 'string',
    default: '',
    placeholder: 'user-id-1,user-id-2',
    description: 'Comma-separated list of user IDs to add to the group',
    displayOptions: { show: { resource: ['user'], operation: ['createGroup'] } },
  },
];

export const getGroupDescription: INodeProperties[] = [
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    default: '',
    description: 'The user group ID',
    displayOptions: { show: { resource: ['user'], operation: ['getGroup'] } },
  },
];

export const updateGroupDescription: INodeProperties[] = [
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    default: '',
    description: 'The user group ID',
    displayOptions: { show: { resource: ['user'], operation: ['updateGroup'] } },
  },
  {
    displayName: 'Group Name',
    name: 'groupName',
    type: 'string',
    default: '',
    description: 'The new name for the group',
    displayOptions: { show: { resource: ['user'], operation: ['updateGroup'] } },
  },
  {
    displayName: 'Member IDs',
    name: 'memberIds',
    type: 'string',
    default: '',
    placeholder: 'user-id-1,user-id-2',
    description: 'Comma-separated list of user IDs (replaces existing members)',
    displayOptions: { show: { resource: ['user'], operation: ['updateGroup'] } },
  },
];

export const deleteGroupDescription: INodeProperties[] = [
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    default: '',
    description: 'The user group ID to delete',
    displayOptions: { show: { resource: ['user'], operation: ['deleteGroup'] } },
  },
];

export async function executeListUsers(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/users' });
}

export async function executeListGroups(this: IExecuteFunctions): Promise<unknown> {
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: '/users/groups' });
}

export async function executeCreateGroup(this: IExecuteFunctions, index: number): Promise<unknown> {
  const groupName = this.getNodeParameter('groupName', index) as string;
  const memberIdsStr = this.getNodeParameter('memberIds', index, '') as string;
  const memberIds = memberIdsStr ? memberIdsStr.split(',').map((id) => id.trim()) : [];
  return fireblocksApiRequest.call(this, {
    method: 'POST',
    endpoint: '/users/groups',
    body: { groupName, memberIds },
  });
}

export async function executeGetGroup(this: IExecuteFunctions, index: number): Promise<unknown> {
  const groupId = this.getNodeParameter('groupId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'GET', endpoint: `/users/groups/${groupId}` });
}

export async function executeUpdateGroup(this: IExecuteFunctions, index: number): Promise<unknown> {
  const groupId = this.getNodeParameter('groupId', index) as string;
  const groupName = this.getNodeParameter('groupName', index, '') as string;
  const memberIdsStr = this.getNodeParameter('memberIds', index, '') as string;
  const body: Record<string, unknown> = {};
  if (groupName) body.groupName = groupName;
  if (memberIdsStr) body.memberIds = memberIdsStr.split(',').map((id) => id.trim());
  return fireblocksApiRequest.call(this, { method: 'PUT', endpoint: `/users/groups/${groupId}`, body });
}

export async function executeDeleteGroup(this: IExecuteFunctions, index: number): Promise<unknown> {
  const groupId = this.getNodeParameter('groupId', index) as string;
  return fireblocksApiRequest.call(this, { method: 'DELETE', endpoint: `/users/groups/${groupId}` });
}
