/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class FireblocksApi implements ICredentialType {
  name = 'fireblocksApi';
  displayName = 'Fireblocks API';
  documentationUrl = 'https://developers.fireblocks.com/reference/api-overview';
  icon = 'file:fireblocks.svg' as const;

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      description: 'UUID format Fireblocks API key from your workspace settings',
    },
    {
      displayName: 'Private Key',
      name: 'privateKey',
      type: 'string',
      typeOptions: {
        password: true,
        rows: 10,
      },
      default: '',
      required: true,
      placeholder: '-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----',
      description: 'RSA-4096 private key in PEM format for JWT signing',
    },
    {
      displayName: 'Environment',
      name: 'environment',
      type: 'options',
      default: 'production',
      required: true,
      options: [
        {
          name: 'Production',
          value: 'production',
          description: 'Production environment (api.fireblocks.io)',
        },
        {
          name: 'Sandbox',
          value: 'sandbox',
          description: 'Sandbox environment for testing (sandbox-api.fireblocks.io)',
        },
      ],
      description: 'Select the Fireblocks API environment to connect to',
    },
    {
      displayName: 'API Co-Signer URL',
      name: 'coSignerUrl',
      type: 'string',
      default: '',
      placeholder: 'https://your-cosigner.example.com',
      description: 'Custom co-signer endpoint for transaction signing (optional)',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {},
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.environment === "sandbox" ? "https://sandbox-api.fireblocks.io/v1" : "https://api.fireblocks.io/v1"}}',
      url: '/vault/accounts_paged',
      qs: {
        limit: '1',
      },
    },
  };
}
