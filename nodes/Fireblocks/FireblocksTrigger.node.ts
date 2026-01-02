/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import { createHmac } from 'crypto';

export class FireblocksTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Fireblocks Trigger',
    name: 'fireblocksTrigger',
    icon: 'file:fireblocks.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["events"].join(", ")}}',
    description: 'Receive Fireblocks webhook events in real-time',
    defaults: {
      name: 'Fireblocks Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'fireblocksApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: [
          // Transaction Events
          {
            name: 'Transaction Approval Required',
            value: 'TRANSACTION_APPROVAL_STATUS_UPDATED',
            description: 'Transaction requires approval',
          },
          {
            name: 'Transaction Blocked',
            value: 'TRANSACTION_BLOCKED',
            description: 'Transaction blocked by TAP policy',
          },
          {
            name: 'Transaction Completed',
            value: 'TRANSACTION_COMPLETED',
            description: 'Transaction completed successfully',
          },
          {
            name: 'Transaction Created',
            value: 'TRANSACTION_CREATED',
            description: 'New transaction initiated',
          },
          {
            name: 'Transaction Failed',
            value: 'TRANSACTION_FAILED',
            description: 'Transaction failed',
          },
          {
            name: 'Transaction Status Changed',
            value: 'TRANSACTION_STATUS_UPDATED',
            description: 'Transaction status updated',
          },
          // Vault Events
          {
            name: 'Address Created',
            value: 'VAULT_ACCOUNT_ASSET_ADDRESS_CREATED',
            description: 'New deposit address generated',
          },
          {
            name: 'Balance Updated',
            value: 'VAULT_ACCOUNT_ASSET_BALANCE_UPDATED',
            description: 'Balance change detected',
          },
          {
            name: 'Vault Account Created',
            value: 'VAULT_ACCOUNT_CREATED',
            description: 'New vault account created',
          },
          {
            name: 'Vault Account Updated',
            value: 'VAULT_ACCOUNT_UPDATED',
            description: 'Vault account modified',
          },
          // Exchange Events
          {
            name: 'Exchange Account Connected',
            value: 'EXCHANGE_ACCOUNT_CONNECTED',
            description: 'New exchange linked',
          },
          {
            name: 'Exchange Balance Updated',
            value: 'EXCHANGE_ACCOUNT_ASSET_BALANCE_UPDATED',
            description: 'Exchange balance synced',
          },
          // Staking Events
          {
            name: 'Staking Position Created',
            value: 'STAKING_POSITION_CREATED',
            description: 'New staking position initiated',
          },
          {
            name: 'Staking Rewards Available',
            value: 'STAKING_REWARDS_AVAILABLE',
            description: 'Claimable rewards detected',
          },
          {
            name: 'Unstaking Completed',
            value: 'UNSTAKING_COMPLETED',
            description: 'Unstaking funds available',
          },
          // NFT Events
          {
            name: 'NFT Received',
            value: 'NFT_TOKEN_RECEIVED',
            description: 'Incoming NFT transfer',
          },
          {
            name: 'NFT Sent',
            value: 'NFT_TOKEN_SENT',
            description: 'Outgoing NFT transfer',
          },
          // Network Events
          {
            name: 'Network Connection Created',
            value: 'NETWORK_CONNECTION_CREATED',
            description: 'New network connection established',
          },
          {
            name: 'Network Connection Removed',
            value: 'NETWORK_CONNECTION_REMOVED',
            description: 'Network connection deleted',
          },
          // Wallet Events
          {
            name: 'External Wallet Asset Added',
            value: 'EXTERNAL_WALLET_ASSET_ADDED',
            description: 'Asset whitelisted in external wallet',
          },
          {
            name: 'Internal Wallet Asset Added',
            value: 'INTERNAL_WALLET_ASSET_ADDED',
            description: 'Asset whitelisted in internal wallet',
          },
        ],
        default: ['TRANSACTION_CREATED', 'TRANSACTION_STATUS_UPDATED', 'TRANSACTION_COMPLETED'],
        required: true,
        description: 'Select which events should trigger the workflow',
      },
      {
        displayName: 'Webhook Secret',
        name: 'webhookSecret',
        type: 'string',
        typeOptions: {
          password: true,
        },
        default: '',
        description:
          'Secret for validating webhook signatures. Generate this in the Fireblocks console when setting up webhooks.',
      },
      {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        options: [
          {
            displayName: 'Skip Signature Validation',
            name: 'skipSignatureValidation',
            type: 'boolean',
            default: false,
            description:
              'WARNING: Only enable for testing. In production, always validate webhook signatures.',
          },
          {
            displayName: 'Include Raw Payload',
            name: 'includeRawPayload',
            type: 'boolean',
            default: false,
            description: 'Include the raw webhook payload in the output',
          },
        ],
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        // In production, you would check if the webhook is registered with Fireblocks
        // For now, we'll return true as webhooks need to be manually configured in Fireblocks
        return true;
      },
      async create(this: IHookFunctions): Promise<boolean> {
        // In production, you would register the webhook with Fireblocks API
        // Manual registration is required - return webhook URL to display to user
        const webhookUrl = this.getNodeWebhookUrl('default');
        console.log(`Fireblocks webhook URL: ${webhookUrl}`);
        console.log('Please register this URL in your Fireblocks workspace settings');
        return true;
      },
      async delete(this: IHookFunctions): Promise<boolean> {
        // In production, you would delete the webhook from Fireblocks API
        // Manual deletion required
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const body = this.getBodyData() as IDataObject;
    const events = this.getNodeParameter('events') as string[];
    const webhookSecret = this.getNodeParameter('webhookSecret', '') as string;
    const options = this.getNodeParameter('options', {}) as {
      skipSignatureValidation?: boolean;
      includeRawPayload?: boolean;
    };

    // Validate webhook signature if secret is provided
    if (webhookSecret && !options.skipSignatureValidation) {
      const signature = req.headers['fireblocks-signature'] as string | undefined;
      if (!signature) {
        console.warn('Fireblocks webhook received without signature header');
        return { workflowData: [] };
      }

      const timestamp = req.headers['fireblocks-timestamp'] as string | undefined;
      if (!timestamp) {
        console.warn('Fireblocks webhook received without timestamp header');
        return { workflowData: [] };
      }

      // Verify timestamp is within 5 minutes
      const timestampMs = parseInt(timestamp, 10);
      const now = Date.now();
      if (Math.abs(now - timestampMs) > 300000) {
        console.warn('Fireblocks webhook timestamp is too old');
        return { workflowData: [] };
      }

      // Compute expected signature
      const rawBody = JSON.stringify(body);
      const signaturePayload = `${timestamp}.${rawBody}`;
      const expectedSignature = createHmac('sha256', webhookSecret)
        .update(signaturePayload)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.warn('Fireblocks webhook signature validation failed');
        return { workflowData: [] };
      }
    }

    // Extract event type from payload
    const eventType = body.type as string;
    if (!eventType) {
      console.warn('Fireblocks webhook received without event type');
      return { workflowData: [] };
    }

    // Check if this event type is one we're listening for
    if (!events.includes(eventType)) {
      // Event not in our subscription list - ignore
      return { workflowData: [] };
    }

    // Build response data
    const responseData: IDataObject = {
      eventType,
      timestamp: body.timestamp || new Date().toISOString(),
      data: body.data || body,
    };

    // Add transaction-specific fields if present
    if (body.txId) {
      responseData.transactionId = body.txId;
    }
    if (body.status) {
      responseData.status = body.status;
    }
    if (body.assetId) {
      responseData.assetId = body.assetId;
    }
    if (body.amount) {
      responseData.amount = body.amount;
    }

    // Include raw payload if requested
    if (options.includeRawPayload) {
      responseData.rawPayload = body;
    }

    return {
      workflowData: [this.helpers.returnJsonArray([responseData])],
    };
  }
}
