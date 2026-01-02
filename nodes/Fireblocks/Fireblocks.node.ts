/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

// Vault Account operations
import * as vaultAccountList from './actions/vaultAccount/list.operation';
import * as vaultAccountGet from './actions/vaultAccount/get.operation';
import * as vaultAccountCreate from './actions/vaultAccount/create.operation';
import * as vaultAccountUpdate from './actions/vaultAccount/update.operation';
import * as vaultAccountOther from './actions/vaultAccount/other.operation';

// Vault Wallet operations
import * as vaultWallet from './actions/vaultWallet/vaultWallet.operation';

// Transaction operations
import * as transaction from './actions/transaction/transaction.operation';

// Exchange Account operations
import * as exchangeAccount from './actions/exchangeAccount/exchangeAccount.operation';

// Internal Wallet operations
import * as internalWallet from './actions/internalWallet/internalWallet.operation';

// External Wallet operations
import * as externalWallet from './actions/externalWallet/externalWallet.operation';

// Gas Station operations
import * as gasStation from './actions/gasStation/gasStation.operation';

// Asset operations
import * as asset from './actions/asset/asset.operation';

// Staking operations
import * as staking from './actions/staking/staking.operation';

// NFT operations
import * as nft from './actions/nft/nft.operation';

// Smart Contract operations
import * as smartContract from './actions/smartContract/smartContract.operation';

// Network Connection operations
import * as networkConnection from './actions/networkConnection/networkConnection.operation';

// Webhook operations
import * as webhook from './actions/webhook/webhook.operation';

// User operations
import * as user from './actions/user/user.operation';

// Policy operations
import * as policy from './actions/policy/policy.operation';

// Emit licensing notice on first load
const LICENSING_NOTICE_KEY = '__fireblocks_license_notice_emitted__';
const globalRegistry = globalThis as unknown as Record<string, boolean>;
if (!globalRegistry[LICENSING_NOTICE_KEY]) {
  console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
  globalRegistry[LICENSING_NOTICE_KEY] = true;
}

export class Fireblocks implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Fireblocks',
    name: 'fireblocks',
    icon: 'file:fireblocks.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      'Interact with Fireblocks institutional digital asset custody platform for vault management, transactions, staking, NFTs, and more',
    defaults: {
      name: 'Fireblocks',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'fireblocksApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Asset', value: 'asset' },
          { name: 'Exchange Account', value: 'exchangeAccount' },
          { name: 'External Wallet', value: 'externalWallet' },
          { name: 'Gas Station', value: 'gasStation' },
          { name: 'Internal Wallet', value: 'internalWallet' },
          { name: 'Network Connection', value: 'networkConnection' },
          { name: 'NFT', value: 'nft' },
          { name: 'Policy', value: 'policy' },
          { name: 'Smart Contract', value: 'smartContract' },
          { name: 'Staking', value: 'staking' },
          { name: 'Transaction', value: 'transaction' },
          { name: 'User', value: 'user' },
          { name: 'Vault Account', value: 'vaultAccount' },
          { name: 'Vault Wallet', value: 'vaultWallet' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'vaultAccount',
      },
      // Vault Account Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['vaultAccount'] } },
        options: [
          { name: 'Create', value: 'create', description: 'Create a new vault account', action: 'Create a vault account' },
          { name: 'Get', value: 'get', description: 'Get a vault account by ID', action: 'Get a vault account' },
          { name: 'Get Balance', value: 'getBalance', description: 'Get balance for a specific asset', action: 'Get vault account balance' },
          { name: 'Get Max Spendable', value: 'getMaxSpendable', description: 'Get maximum spendable amount', action: 'Get max spendable amount' },
          { name: 'Hide', value: 'hide', description: 'Hide vault account from console', action: 'Hide a vault account' },
          { name: 'List', value: 'list', description: 'List all vault accounts', action: 'List vault accounts' },
          { name: 'Set Auto Fuel', value: 'setAutoFuel', description: 'Enable/disable auto-fueling', action: 'Set auto fuel' },
          { name: 'Set Customer Ref ID', value: 'setCustomerRefId', description: 'Set customer reference ID for AML', action: 'Set customer ref ID' },
          { name: 'Unhide', value: 'unhide', description: 'Unhide vault account', action: 'Unhide a vault account' },
          { name: 'Update', value: 'update', description: 'Update vault account name', action: 'Update a vault account' },
        ],
        default: 'list',
      },
      // Vault Wallet Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['vaultWallet'] } },
        options: [
          { name: 'Convert Legacy Address', value: 'convertLegacyAddress', description: 'Convert to legacy address format', action: 'Convert legacy address' },
          { name: 'Create', value: 'create', description: 'Activate an asset in vault account', action: 'Create a vault wallet' },
          { name: 'Create Address', value: 'createAddress', description: 'Create a new deposit address', action: 'Create deposit address' },
          { name: 'Get Asset', value: 'getAsset', description: 'Get asset details and balance', action: 'Get vault wallet asset' },
          { name: 'Get Unspent Inputs', value: 'getUnspentInputs', description: 'Get UTXO information', action: 'Get unspent inputs' },
          { name: 'List', value: 'list', description: 'List all wallets in vault account', action: 'List vault wallets' },
          { name: 'List Addresses', value: 'listAddresses', description: 'List all deposit addresses', action: 'List addresses' },
          { name: 'Refresh Balance', value: 'refreshBalance', description: 'Force balance refresh', action: 'Refresh balance' },
          { name: 'Update Address', value: 'updateAddress', description: 'Update address description', action: 'Update address' },
        ],
        default: 'list',
      },
      // Transaction Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['transaction'] } },
        options: [
          { name: 'Cancel', value: 'cancel', description: 'Cancel a pending transaction', action: 'Cancel transaction' },
          { name: 'Create', value: 'create', description: 'Create a new transaction', action: 'Create a transaction' },
          { name: 'Drop', value: 'drop', description: 'Drop (replace) a stuck transaction', action: 'Drop transaction' },
          { name: 'Estimate Fee', value: 'estimateFee', description: 'Estimate transaction fee', action: 'Estimate transaction fee' },
          { name: 'Freeze', value: 'freeze', description: 'Freeze a transaction', action: 'Freeze transaction' },
          { name: 'Get', value: 'get', description: 'Get transaction by ID', action: 'Get a transaction' },
          { name: 'Get by External ID', value: 'getByExternalId', description: 'Get transaction by external reference', action: 'Get by external ID' },
          { name: 'List', value: 'list', description: 'List transactions', action: 'List transactions' },
          { name: 'Set Confirmation Threshold', value: 'setConfirmationThreshold', description: 'Set custom confirmation threshold', action: 'Set confirmation threshold' },
          { name: 'Unfreeze', value: 'unfreeze', description: 'Unfreeze a frozen transaction', action: 'Unfreeze transaction' },
          { name: 'Validate Address', value: 'validateAddress', description: 'Validate a blockchain address', action: 'Validate address' },
        ],
        default: 'list',
      },
      // Exchange Account Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['exchangeAccount'] } },
        options: [
          { name: 'Convert', value: 'convert', description: 'Convert assets on exchange', action: 'Convert assets' },
          { name: 'Get', value: 'get', description: 'Get exchange account details', action: 'Get exchange account' },
          { name: 'Get Asset', value: 'getAsset', description: 'Get asset balance on exchange', action: 'Get exchange asset' },
          { name: 'Internal Transfer', value: 'internalTransfer', description: 'Transfer between sub-accounts', action: 'Internal transfer' },
          { name: 'List', value: 'list', description: 'List all connected exchanges', action: 'List exchange accounts' },
        ],
        default: 'list',
      },
      // Internal Wallet Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['internalWallet'] } },
        options: [
          { name: 'Add Asset', value: 'addAsset', description: 'Add asset to internal wallet', action: 'Add asset to wallet' },
          { name: 'Create', value: 'create', description: 'Create a new internal wallet', action: 'Create internal wallet' },
          { name: 'Delete', value: 'delete', description: 'Delete an internal wallet', action: 'Delete internal wallet' },
          { name: 'Get', value: 'get', description: 'Get internal wallet details', action: 'Get internal wallet' },
          { name: 'List', value: 'list', description: 'List all internal wallets', action: 'List internal wallets' },
          { name: 'Remove Asset', value: 'removeAsset', description: 'Remove asset from wallet', action: 'Remove asset' },
          { name: 'Set Customer Ref ID', value: 'setCustomerRefId', description: 'Set customer reference ID', action: 'Set customer ref ID' },
        ],
        default: 'list',
      },
      // External Wallet Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['externalWallet'] } },
        options: [
          { name: 'Add Asset', value: 'addAsset', description: 'Add asset to external wallet', action: 'Add asset to wallet' },
          { name: 'Create', value: 'create', description: 'Create a new external wallet', action: 'Create external wallet' },
          { name: 'Delete', value: 'delete', description: 'Delete an external wallet', action: 'Delete external wallet' },
          { name: 'Get', value: 'get', description: 'Get external wallet details', action: 'Get external wallet' },
          { name: 'List', value: 'list', description: 'List all external wallets', action: 'List external wallets' },
          { name: 'Remove Asset', value: 'removeAsset', description: 'Remove asset from wallet', action: 'Remove asset' },
          { name: 'Set Customer Ref ID', value: 'setCustomerRefId', description: 'Set customer reference ID', action: 'Set customer ref ID' },
        ],
        default: 'list',
      },
      // Gas Station Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['gasStation'] } },
        options: [
          { name: 'Get By Asset', value: 'getByAsset', description: 'Get gas station settings for asset', action: 'Get gas station by asset' },
          { name: 'Get Settings', value: 'getSettings', description: 'Get gas station settings', action: 'Get gas station settings' },
          { name: 'Update By Asset', value: 'updateByAsset', description: 'Update settings for specific asset', action: 'Update gas station by asset' },
          { name: 'Update Settings', value: 'updateSettings', description: 'Update gas station settings', action: 'Update gas station settings' },
        ],
        default: 'getSettings',
      },
      // Asset Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['asset'] } },
        options: [
          { name: 'Get', value: 'get', description: 'Get specific asset details', action: 'Get asset' },
          { name: 'Get Blockchain', value: 'getBlockchain', description: 'Get blockchain details', action: 'Get blockchain' },
          { name: 'List', value: 'list', description: 'List assets with metadata', action: 'List assets' },
          { name: 'List Blockchains', value: 'listBlockchains', description: 'List supported blockchains', action: 'List blockchains' },
          { name: 'List Supported', value: 'listSupported', description: 'List all supported assets', action: 'List supported assets' },
          { name: 'Register', value: 'register', description: 'Register a custom token', action: 'Register asset' },
          { name: 'Set Price', value: 'setPrice', description: 'Set custom asset price', action: 'Set asset price' },
          { name: 'Update Metadata', value: 'updateMetadata', description: 'Update asset metadata', action: 'Update asset metadata' },
        ],
        default: 'listSupported',
      },
      // Staking Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['staking'] } },
        options: [
          { name: 'Claim Rewards', value: 'claimRewards', description: 'Claim staking rewards', action: 'Claim rewards' },
          { name: 'Get Chain Info', value: 'getChainInfo', description: 'Get staking parameters for chain', action: 'Get chain info' },
          { name: 'Get Position', value: 'getPosition', description: 'Get specific staking position', action: 'Get position' },
          { name: 'Get Positions Summary', value: 'getPositionsSummary', description: 'Get aggregated staking summary', action: 'Get positions summary' },
          { name: 'List Chains', value: 'listChains', description: 'List supported staking chains', action: 'List chains' },
          { name: 'List Positions', value: 'listPositions', description: 'List all staking positions', action: 'List positions' },
          { name: 'List Providers', value: 'listProviders', description: 'List staking validators', action: 'List providers' },
          { name: 'Stake', value: 'stake', description: 'Create a staking position', action: 'Stake' },
          { name: 'Unstake', value: 'unstake', description: 'Begin unstaking process', action: 'Unstake' },
          { name: 'Withdraw', value: 'withdraw', description: 'Withdraw unstaked funds', action: 'Withdraw' },
        ],
        default: 'listChains',
      },
      // NFT Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['nft'] } },
        options: [
          { name: 'Get By IDs', value: 'getByIds', description: 'Get NFTs by IDs', action: 'Get NFTs by IDs' },
          { name: 'Get Details', value: 'getDetails', description: 'Get specific NFT details', action: 'Get NFT details' },
          { name: 'List Collections', value: 'listCollections', description: 'List owned NFT collections', action: 'List collections' },
          { name: 'List Owned', value: 'listOwned', description: 'List owned NFT tokens', action: 'List owned tokens' },
          { name: 'Refresh Metadata', value: 'refreshMetadata', description: 'Force metadata refresh', action: 'Refresh metadata' },
          { name: 'Refresh Vault Tokens', value: 'refreshVaultTokens', description: 'Sync NFT holdings', action: 'Refresh vault tokens' },
          { name: 'Update Ownership Status', value: 'updateOwnershipStatus', description: 'Mark as transferred/burned', action: 'Update ownership status' },
          { name: 'Update Spam Status', value: 'updateSpamStatus', description: 'Flag spam NFTs', action: 'Update spam status' },
        ],
        default: 'listOwned',
      },
      // Smart Contract Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['smartContract'] } },
        options: [
          { name: 'Delete Template', value: 'deleteTemplate', description: 'Delete a contract template', action: 'Delete template' },
          { name: 'Deploy', value: 'deploy', description: 'Deploy contract from template', action: 'Deploy contract' },
          { name: 'Fetch ABI', value: 'fetchAbi', description: 'Retrieve ABI from chain', action: 'Fetch ABI' },
          { name: 'Get Constructor', value: 'getConstructor', description: 'Get template constructor params', action: 'Get constructor' },
          { name: 'Get Deployed', value: 'getDeployed', description: 'Get deployed contract details', action: 'Get deployed contract' },
          { name: 'Get Function ABI', value: 'getFunctionAbi', description: 'Get function details', action: 'Get function ABI' },
          { name: 'Get Template', value: 'getTemplate', description: 'Get template details', action: 'Get template' },
          { name: 'Get Transaction Receipt', value: 'getTransactionReceipt', description: 'Get deployment receipt', action: 'Get transaction receipt' },
          { name: 'List Deployed', value: 'listDeployed', description: 'List deployed contracts', action: 'List deployed contracts' },
          { name: 'List Templates', value: 'listTemplates', description: 'List contract templates', action: 'List templates' },
          { name: 'Read Contract', value: 'readContract', description: 'Call read function', action: 'Read contract' },
          { name: 'Save ABI', value: 'saveAbi', description: 'Store ABI locally', action: 'Save ABI' },
          { name: 'Upload Template', value: 'uploadTemplate', description: 'Upload new template', action: 'Upload template' },
          { name: 'Write Contract', value: 'writeContract', description: 'Execute write function', action: 'Write contract' },
        ],
        default: 'listTemplates',
      },
      // Network Connection Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['networkConnection'] } },
        options: [
          { name: 'Create', value: 'create', description: 'Create network connection', action: 'Create connection' },
          { name: 'Create Network ID', value: 'createNetworkId', description: 'Create new network identifier', action: 'Create network ID' },
          { name: 'Delete', value: 'delete', description: 'Delete network connection', action: 'Delete connection' },
          { name: 'Delete Network ID', value: 'deleteNetworkId', description: 'Delete network identifier', action: 'Delete network ID' },
          { name: 'Get', value: 'get', description: 'Get connection details', action: 'Get connection' },
          { name: 'Get Network ID', value: 'getNetworkId', description: 'Get network identifier details', action: 'Get network ID' },
          { name: 'List', value: 'list', description: 'List all network connections', action: 'List connections' },
          { name: 'List Network IDs', value: 'listNetworkIds', description: 'List network identifiers', action: 'List network IDs' },
          { name: 'Update Routing Policy', value: 'updateRoutingPolicy', description: 'Modify routing rules', action: 'Update routing policy' },
        ],
        default: 'list',
      },
      // Webhook Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['webhook'] } },
        options: [
          { name: 'Create', value: 'create', description: 'Register webhook endpoint', action: 'Create webhook' },
          { name: 'Delete', value: 'delete', description: 'Remove webhook', action: 'Delete webhook' },
          { name: 'Get', value: 'get', description: 'Get webhook details', action: 'Get webhook' },
          { name: 'Get Metrics', value: 'getMetrics', description: 'Get delivery statistics', action: 'Get webhook metrics' },
          { name: 'List', value: 'list', description: 'List all webhooks', action: 'List webhooks' },
          { name: 'List Notifications', value: 'listNotifications', description: 'List notification history', action: 'List notifications' },
          { name: 'Resend Notification', value: 'resendNotification', description: 'Retry failed delivery', action: 'Resend notification' },
          { name: 'Update', value: 'update', description: 'Update webhook config', action: 'Update webhook' },
        ],
        default: 'list',
      },
      // User Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['user'] } },
        options: [
          { name: 'Create Group', value: 'createGroup', description: 'Create user group', action: 'Create group' },
          { name: 'Delete Group', value: 'deleteGroup', description: 'Delete user group', action: 'Delete group' },
          { name: 'Get Group', value: 'getGroup', description: 'Get group details', action: 'Get group' },
          { name: 'List Groups', value: 'listGroups', description: 'List user groups', action: 'List groups' },
          { name: 'List Users', value: 'listUsers', description: 'List workspace users', action: 'List users' },
          { name: 'Update Group', value: 'updateGroup', description: 'Update group membership', action: 'Update group' },
        ],
        default: 'listUsers',
      },
      // Policy Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['policy'] } },
        options: [
          { name: 'Get Active', value: 'getActive', description: 'Get current TAP policy', action: 'Get active policy' },
          { name: 'Get Draft', value: 'getDraft', description: 'Get pending policy changes', action: 'Get draft policy' },
          { name: 'Publish Draft', value: 'publishDraft', description: 'Activate policy changes', action: 'Publish draft' },
          { name: 'Update Draft', value: 'updateDraft', description: 'Modify draft policy', action: 'Update draft' },
        ],
        default: 'getActive',
      },
      // All operation field descriptions
      ...vaultAccountList.description,
      ...vaultAccountGet.description,
      ...vaultAccountCreate.description,
      ...vaultAccountUpdate.description,
      ...vaultAccountOther.hideDescription,
      ...vaultAccountOther.unhideDescription,
      ...vaultAccountOther.getBalanceDescription,
      ...vaultAccountOther.setCustomerRefIdDescription,
      ...vaultAccountOther.setAutoFuelDescription,
      ...vaultAccountOther.getMaxSpendableDescription,
      ...vaultWallet.listDescription,
      ...vaultWallet.createDescription,
      ...vaultWallet.getAssetDescription,
      ...vaultWallet.refreshBalanceDescription,
      ...vaultWallet.listAddressesDescription,
      ...vaultWallet.createAddressDescription,
      ...vaultWallet.updateAddressDescription,
      ...vaultWallet.getUnspentInputsDescription,
      ...vaultWallet.convertLegacyAddressDescription,
      ...transaction.listDescription,
      ...transaction.getDescription,
      ...transaction.getByExternalIdDescription,
      ...transaction.createDescription,
      ...transaction.estimateFeeDescription,
      ...transaction.cancelDescription,
      ...transaction.freezeDescription,
      ...transaction.unfreezeDescription,
      ...transaction.dropDescription,
      ...transaction.setConfirmationThresholdDescription,
      ...transaction.validateAddressDescription,
      ...exchangeAccount.listDescription,
      ...exchangeAccount.getDescription,
      ...exchangeAccount.getAssetDescription,
      ...exchangeAccount.internalTransferDescription,
      ...exchangeAccount.convertDescription,
      ...internalWallet.listDescription,
      ...internalWallet.createDescription,
      ...internalWallet.getDescription,
      ...internalWallet.deleteDescription,
      ...internalWallet.addAssetDescription,
      ...internalWallet.removeAssetDescription,
      ...internalWallet.setCustomerRefIdDescription,
      ...externalWallet.listDescription,
      ...externalWallet.createDescription,
      ...externalWallet.getDescription,
      ...externalWallet.deleteDescription,
      ...externalWallet.addAssetDescription,
      ...externalWallet.removeAssetDescription,
      ...externalWallet.setCustomerRefIdDescription,
      ...gasStation.getSettingsDescription,
      ...gasStation.getByAssetDescription,
      ...gasStation.updateSettingsDescription,
      ...gasStation.updateByAssetDescription,
      ...asset.listSupportedDescription,
      ...asset.listDescription,
      ...asset.getDescription,
      ...asset.registerDescription,
      ...asset.updateMetadataDescription,
      ...asset.setPriceDescription,
      ...asset.listBlockchainsDescription,
      ...asset.getBlockchainDescription,
      ...staking.listChainsDescription,
      ...staking.getChainInfoDescription,
      ...staking.stakeDescription,
      ...staking.unstakeDescription,
      ...staking.withdrawDescription,
      ...staking.claimRewardsDescription,
      ...staking.listPositionsDescription,
      ...staking.getPositionDescription,
      ...staking.getPositionsSummaryDescription,
      ...staking.listProvidersDescription,
      ...nft.refreshVaultTokensDescription,
      ...nft.listOwnedTokensDescription,
      ...nft.listOwnedCollectionsDescription,
      ...nft.getDetailsDescription,
      ...nft.getByIdsDescription,
      ...nft.refreshMetadataDescription,
      ...nft.updateOwnershipStatusDescription,
      ...nft.updateSpamStatusDescription,
      ...smartContract.listTemplatesDescription,
      ...smartContract.uploadTemplateDescription,
      ...smartContract.getTemplateDescription,
      ...smartContract.deleteTemplateDescription,
      ...smartContract.getConstructorDescription,
      ...smartContract.getFunctionAbiDescription,
      ...smartContract.deployDescription,
      ...smartContract.listDeployedDescription,
      ...smartContract.getDeployedDescription,
      ...smartContract.fetchAbiDescription,
      ...smartContract.saveAbiDescription,
      ...smartContract.readContractDescription,
      ...smartContract.writeContractDescription,
      ...smartContract.getReceiptDescription,
      ...networkConnection.listConnectionsDescription,
      ...networkConnection.createConnectionDescription,
      ...networkConnection.getConnectionDescription,
      ...networkConnection.deleteConnectionDescription,
      ...networkConnection.updateRoutingPolicyDescription,
      ...networkConnection.listNetworkIdsDescription,
      ...networkConnection.createNetworkIdDescription,
      ...networkConnection.getNetworkIdDescription,
      ...networkConnection.deleteNetworkIdDescription,
      ...webhook.createDescription,
      ...webhook.listDescription,
      ...webhook.getDescription,
      ...webhook.updateDescription,
      ...webhook.deleteDescription,
      ...webhook.getMetricsDescription,
      ...webhook.listNotificationsDescription,
      ...webhook.resendNotificationDescription,
      ...user.listUsersDescription,
      ...user.listGroupsDescription,
      ...user.createGroupDescription,
      ...user.getGroupDescription,
      ...user.updateGroupDescription,
      ...user.deleteGroupDescription,
      ...policy.getActiveDescription,
      ...policy.getDraftDescription,
      ...policy.updateDraftDescription,
      ...policy.publishDraftDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let result: unknown;

        switch (resource) {
          case 'vaultAccount':
            result = await executeVaultAccountOperation.call(this, operation, i);
            break;
          case 'vaultWallet':
            result = await executeVaultWalletOperation.call(this, operation, i);
            break;
          case 'transaction':
            result = await executeTransactionOperation.call(this, operation, i);
            break;
          case 'exchangeAccount':
            result = await executeExchangeAccountOperation.call(this, operation, i);
            break;
          case 'internalWallet':
            result = await executeInternalWalletOperation.call(this, operation, i);
            break;
          case 'externalWallet':
            result = await executeExternalWalletOperation.call(this, operation, i);
            break;
          case 'gasStation':
            result = await executeGasStationOperation.call(this, operation, i);
            break;
          case 'asset':
            result = await executeAssetOperation.call(this, operation, i);
            break;
          case 'staking':
            result = await executeStakingOperation.call(this, operation, i);
            break;
          case 'nft':
            result = await executeNftOperation.call(this, operation, i);
            break;
          case 'smartContract':
            result = await executeSmartContractOperation.call(this, operation, i);
            break;
          case 'networkConnection':
            result = await executeNetworkConnectionOperation.call(this, operation, i);
            break;
          case 'webhook':
            result = await executeWebhookOperation.call(this, operation, i);
            break;
          case 'user':
            result = await executeUserOperation.call(this, operation, i);
            break;
          case 'policy':
            result = await executePolicyOperation.call(this, operation, i);
            break;
          default:
            throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(result as IDataObject | IDataObject[]),
          { itemData: { item: i } },
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: (error as Error).message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

// Operation executors
async function executeVaultAccountOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return vaultAccountList.execute.call(this, index);
    case 'get':
      return vaultAccountGet.execute.call(this, index);
    case 'create':
      return vaultAccountCreate.execute.call(this, index);
    case 'update':
      return vaultAccountUpdate.execute.call(this, index);
    case 'hide':
      return vaultAccountOther.executeHide.call(this, index);
    case 'unhide':
      return vaultAccountOther.executeUnhide.call(this, index);
    case 'getBalance':
      return vaultAccountOther.executeGetBalance.call(this, index);
    case 'setCustomerRefId':
      return vaultAccountOther.executeSetCustomerRefId.call(this, index);
    case 'setAutoFuel':
      return vaultAccountOther.executeSetAutoFuel.call(this, index);
    case 'getMaxSpendable':
      return vaultAccountOther.executeGetMaxSpendable.call(this, index);
    default:
      throw new Error(`Unknown vault account operation: ${operation}`);
  }
}

async function executeVaultWalletOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return vaultWallet.executeList.call(this, index);
    case 'create':
      return vaultWallet.executeCreate.call(this, index);
    case 'getAsset':
      return vaultWallet.executeGetAsset.call(this, index);
    case 'refreshBalance':
      return vaultWallet.executeRefreshBalance.call(this, index);
    case 'listAddresses':
      return vaultWallet.executeListAddresses.call(this, index);
    case 'createAddress':
      return vaultWallet.executeCreateAddress.call(this, index);
    case 'updateAddress':
      return vaultWallet.executeUpdateAddress.call(this, index);
    case 'getUnspentInputs':
      return vaultWallet.executeGetUnspentInputs.call(this, index);
    case 'convertLegacyAddress':
      return vaultWallet.executeConvertLegacyAddress.call(this, index);
    default:
      throw new Error(`Unknown vault wallet operation: ${operation}`);
  }
}

async function executeTransactionOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return transaction.executeList.call(this, index);
    case 'get':
      return transaction.executeGet.call(this, index);
    case 'getByExternalId':
      return transaction.executeGetByExternalId.call(this, index);
    case 'create':
      return transaction.executeCreate.call(this, index);
    case 'estimateFee':
      return transaction.executeEstimateFee.call(this, index);
    case 'cancel':
      return transaction.executeCancel.call(this, index);
    case 'freeze':
      return transaction.executeFreeze.call(this, index);
    case 'unfreeze':
      return transaction.executeUnfreeze.call(this, index);
    case 'drop':
      return transaction.executeDrop.call(this, index);
    case 'setConfirmationThreshold':
      return transaction.executeSetConfirmationThreshold.call(this, index);
    case 'validateAddress':
      return transaction.executeValidateAddress.call(this, index);
    default:
      throw new Error(`Unknown transaction operation: ${operation}`);
  }
}

async function executeExchangeAccountOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return exchangeAccount.executeList.call(this);
    case 'get':
      return exchangeAccount.executeGet.call(this, index);
    case 'getAsset':
      return exchangeAccount.executeGetAsset.call(this, index);
    case 'internalTransfer':
      return exchangeAccount.executeInternalTransfer.call(this, index);
    case 'convert':
      return exchangeAccount.executeConvert.call(this, index);
    default:
      throw new Error(`Unknown exchange account operation: ${operation}`);
  }
}

async function executeInternalWalletOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return internalWallet.executeList.call(this);
    case 'create':
      return internalWallet.executeCreate.call(this, index);
    case 'get':
      return internalWallet.executeGet.call(this, index);
    case 'delete':
      return internalWallet.executeDelete.call(this, index);
    case 'addAsset':
      return internalWallet.executeAddAsset.call(this, index);
    case 'removeAsset':
      return internalWallet.executeRemoveAsset.call(this, index);
    case 'setCustomerRefId':
      return internalWallet.executeSetCustomerRefId.call(this, index);
    default:
      throw new Error(`Unknown internal wallet operation: ${operation}`);
  }
}

async function executeExternalWalletOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return externalWallet.executeList.call(this);
    case 'create':
      return externalWallet.executeCreate.call(this, index);
    case 'get':
      return externalWallet.executeGet.call(this, index);
    case 'delete':
      return externalWallet.executeDelete.call(this, index);
    case 'addAsset':
      return externalWallet.executeAddAsset.call(this, index);
    case 'removeAsset':
      return externalWallet.executeRemoveAsset.call(this, index);
    case 'setCustomerRefId':
      return externalWallet.executeSetCustomerRefId.call(this, index);
    default:
      throw new Error(`Unknown external wallet operation: ${operation}`);
  }
}

async function executeGasStationOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'getSettings':
      return gasStation.executeGetSettings.call(this);
    case 'getByAsset':
      return gasStation.executeGetByAsset.call(this, index);
    case 'updateSettings':
      return gasStation.executeUpdateSettings.call(this, index);
    case 'updateByAsset':
      return gasStation.executeUpdateByAsset.call(this, index);
    default:
      throw new Error(`Unknown gas station operation: ${operation}`);
  }
}

async function executeAssetOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'listSupported':
      return asset.executeListSupported.call(this);
    case 'list':
      return asset.executeList.call(this, index);
    case 'get':
      return asset.executeGet.call(this, index);
    case 'register':
      return asset.executeRegister.call(this, index);
    case 'updateMetadata':
      return asset.executeUpdateMetadata.call(this, index);
    case 'setPrice':
      return asset.executeSetPrice.call(this, index);
    case 'listBlockchains':
      return asset.executeListBlockchains.call(this);
    case 'getBlockchain':
      return asset.executeGetBlockchain.call(this, index);
    default:
      throw new Error(`Unknown asset operation: ${operation}`);
  }
}

async function executeStakingOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'listChains':
      return staking.executeListChains.call(this);
    case 'getChainInfo':
      return staking.executeGetChainInfo.call(this, index);
    case 'stake':
      return staking.executeStake.call(this, index);
    case 'unstake':
      return staking.executeUnstake.call(this, index);
    case 'withdraw':
      return staking.executeWithdraw.call(this, index);
    case 'claimRewards':
      return staking.executeClaimRewards.call(this, index);
    case 'listPositions':
      return staking.executeListPositions.call(this, index);
    case 'getPosition':
      return staking.executeGetPosition.call(this, index);
    case 'getPositionsSummary':
      return staking.executeGetPositionsSummary.call(this);
    case 'listProviders':
      return staking.executeListProviders.call(this, index);
    default:
      throw new Error(`Unknown staking operation: ${operation}`);
  }
}

async function executeNftOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'refreshVaultTokens':
      return nft.executeRefreshVaultTokens.call(this, index);
    case 'listOwned':
      return nft.executeListOwnedTokens.call(this, index);
    case 'listCollections':
      return nft.executeListOwnedCollections.call(this, index);
    case 'getDetails':
      return nft.executeGetDetails.call(this, index);
    case 'getByIds':
      return nft.executeGetByIds.call(this, index);
    case 'refreshMetadata':
      return nft.executeRefreshMetadata.call(this, index);
    case 'updateOwnershipStatus':
      return nft.executeUpdateOwnershipStatus.call(this, index);
    case 'updateSpamStatus':
      return nft.executeUpdateSpamStatus.call(this, index);
    default:
      throw new Error(`Unknown NFT operation: ${operation}`);
  }
}

async function executeSmartContractOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'listTemplates':
      return smartContract.executeListTemplates.call(this, index);
    case 'uploadTemplate':
      return smartContract.executeUploadTemplate.call(this, index);
    case 'getTemplate':
      return smartContract.executeGetTemplate.call(this, index);
    case 'deleteTemplate':
      return smartContract.executeDeleteTemplate.call(this, index);
    case 'getConstructor':
      return smartContract.executeGetConstructor.call(this, index);
    case 'getFunctionAbi':
      return smartContract.executeGetFunctionAbi.call(this, index);
    case 'deploy':
      return smartContract.executeDeploy.call(this, index);
    case 'listDeployed':
      return smartContract.executeListDeployed.call(this, index);
    case 'getDeployed':
      return smartContract.executeGetDeployed.call(this, index);
    case 'fetchAbi':
      return smartContract.executeFetchAbi.call(this, index);
    case 'saveAbi':
      return smartContract.executeSaveAbi.call(this, index);
    case 'readContract':
      return smartContract.executeReadContract.call(this, index);
    case 'writeContract':
      return smartContract.executeWriteContract.call(this, index);
    case 'getTransactionReceipt':
      return smartContract.executeGetReceipt.call(this, index);
    default:
      throw new Error(`Unknown smart contract operation: ${operation}`);
  }
}

async function executeNetworkConnectionOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'list':
      return networkConnection.executeListConnections.call(this, index);
    case 'create':
      return networkConnection.executeCreateConnection.call(this, index);
    case 'get':
      return networkConnection.executeGetConnection.call(this, index);
    case 'delete':
      return networkConnection.executeDeleteConnection.call(this, index);
    case 'updateRoutingPolicy':
      return networkConnection.executeUpdateRoutingPolicy.call(this, index);
    case 'listNetworkIds':
      return networkConnection.executeListNetworkIds.call(this, index);
    case 'createNetworkId':
      return networkConnection.executeCreateNetworkId.call(this, index);
    case 'getNetworkId':
      return networkConnection.executeGetNetworkId.call(this, index);
    case 'deleteNetworkId':
      return networkConnection.executeDeleteNetworkId.call(this, index);
    default:
      throw new Error(`Unknown network connection operation: ${operation}`);
  }
}

async function executeWebhookOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'create':
      return webhook.executeCreate.call(this, index);
    case 'list':
      return webhook.executeList.call(this);
    case 'get':
      return webhook.executeGet.call(this, index);
    case 'update':
      return webhook.executeUpdate.call(this, index);
    case 'delete':
      return webhook.executeDelete.call(this, index);
    case 'getMetrics':
      return webhook.executeGetMetrics.call(this, index);
    case 'listNotifications':
      return webhook.executeListNotifications.call(this, index);
    case 'resendNotification':
      return webhook.executeResendNotification.call(this, index);
    default:
      throw new Error(`Unknown webhook operation: ${operation}`);
  }
}

async function executeUserOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'listUsers':
      return user.executeListUsers.call(this);
    case 'listGroups':
      return user.executeListGroups.call(this);
    case 'createGroup':
      return user.executeCreateGroup.call(this, index);
    case 'getGroup':
      return user.executeGetGroup.call(this, index);
    case 'updateGroup':
      return user.executeUpdateGroup.call(this, index);
    case 'deleteGroup':
      return user.executeDeleteGroup.call(this, index);
    default:
      throw new Error(`Unknown user operation: ${operation}`);
  }
}

async function executePolicyOperation(
  this: IExecuteFunctions,
  operation: string,
  index: number,
): Promise<unknown> {
  switch (operation) {
    case 'getActive':
      return policy.executeGetActive.call(this);
    case 'getDraft':
      return policy.executeGetDraft.call(this);
    case 'updateDraft':
      return policy.executeUpdateDraft.call(this, index);
    case 'publishDraft':
      return policy.executePublishDraft.call(this);
    default:
      throw new Error(`Unknown policy operation: ${operation}`);
  }
}
