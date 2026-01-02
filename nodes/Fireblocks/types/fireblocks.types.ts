/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Fireblocks API environment configuration
 */
export interface FireblocksCredentials {
  apiKey: string;
  privateKey: string;
  environment: 'production' | 'sandbox';
  coSignerUrl?: string;
}

/**
 * JWT payload for Fireblocks API authentication
 */
export interface FireblocksJwtPayload {
  uri: string;
  nonce: string;
  iat: number;
  exp: number;
  sub: string;
  bodyHash: string;
}

/**
 * Generic Fireblocks API response wrapper
 */
export interface FireblocksApiResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

/**
 * Fireblocks pagination parameters
 */
export interface PaginationParams {
  limit?: number;
  before?: string;
  after?: string;
}

/**
 * Fireblocks vault account
 */
export interface VaultAccount {
  id: string;
  name: string;
  hiddenOnUI: boolean;
  customerRefId?: string;
  autoFuel: boolean;
  assets: VaultAsset[];
}

/**
 * Vault asset balance
 */
export interface VaultAsset {
  id: string;
  total: string;
  available: string;
  pending: string;
  frozen: string;
  lockedAmount: string;
  staked?: string;
  blockHeight?: string;
  blockHash?: string;
}

/**
 * Vault wallet address
 */
export interface VaultWalletAddress {
  assetId: string;
  address: string;
  addressFormat?: string;
  legacyAddress?: string;
  description?: string;
  tag?: string;
  type?: string;
  customerRefId?: string;
  bip44AddressIndex?: number;
  enterpriseAddress?: string;
}

/**
 * Transaction peer types
 */
export type PeerType =
  | 'VAULT_ACCOUNT'
  | 'EXCHANGE_ACCOUNT'
  | 'INTERNAL_WALLET'
  | 'EXTERNAL_WALLET'
  | 'FIAT_ACCOUNT'
  | 'NETWORK_CONNECTION'
  | 'COMPOUND'
  | 'GAS_STATION'
  | 'ONE_TIME_ADDRESS'
  | 'OEC_PARTNER'
  | 'END_USER_WALLET';

/**
 * Transaction destination/source
 */
export interface TransferPeerPath {
  type: PeerType;
  id?: string;
  walletId?: string;
  virtualId?: string;
  virtualType?: string;
  oneTimeAddress?: OneTimeAddress;
}

/**
 * One-time address for transactions
 */
export interface OneTimeAddress {
  address: string;
  tag?: string;
}

/**
 * Transaction operation types
 */
export type TransactionOperation =
  | 'TRANSFER'
  | 'MINT'
  | 'BURN'
  | 'CONTRACT_CALL'
  | 'TYPED_MESSAGE'
  | 'RAW'
  | 'ENABLE_ASSET'
  | 'STAKE'
  | 'UNSTAKE'
  | 'WITHDRAW';

/**
 * Transaction status types
 */
export type TransactionStatus =
  | 'SUBMITTED'
  | 'QUEUED'
  | 'PENDING_AUTHORIZATION'
  | 'PENDING_SIGNATURE'
  | 'BROADCASTING'
  | 'PENDING_3RD_PARTY_MANUAL_APPROVAL'
  | 'PENDING_3RD_PARTY'
  | 'CONFIRMING'
  | 'COMPLETED'
  | 'PARTIALLY_COMPLETED'
  | 'CANCELLING'
  | 'CANCELLED'
  | 'REJECTED'
  | 'FAILED'
  | 'TIMEOUT'
  | 'BLOCKED';

/**
 * Transaction details
 */
export interface Transaction {
  id: string;
  assetId: string;
  source: TransferPeerPath;
  destination: TransferPeerPath;
  amount: string;
  fee?: string;
  networkFee?: string;
  amountUSD?: string;
  netAmount?: string;
  createdAt: number;
  lastUpdated: number;
  status: TransactionStatus;
  txHash?: string;
  subStatus?: string;
  sourceAddress?: string;
  destinationAddress?: string;
  destinationAddressDescription?: string;
  destinationTag?: string;
  signedBy?: string[];
  createdBy?: string;
  rejectedBy?: string;
  exchangeTxId?: string;
  customerRefId?: string;
  numOfConfirmations?: number;
  operation: TransactionOperation;
  note?: string;
  extraParameters?: Record<string, unknown>;
}

/**
 * Create transaction request
 */
export interface CreateTransactionRequest {
  assetId: string;
  source: TransferPeerPath;
  destination: TransferPeerPath;
  amount: string;
  note?: string;
  customerRefId?: string;
  autoStaking?: boolean;
  networkFee?: string;
  feeLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  maxFee?: string;
  gasLimit?: string;
  gasPrice?: string;
  priorityFee?: string;
  externalTxId?: string;
  treatAsGrossAmount?: boolean;
  forceSweep?: boolean;
  operation?: TransactionOperation;
  extraParameters?: Record<string, unknown>;
}

/**
 * Transaction fee estimation
 */
export interface TransactionFee {
  low: FeeInfo;
  medium: FeeInfo;
  high: FeeInfo;
}

/**
 * Fee level info
 */
export interface FeeInfo {
  feePerByte?: string;
  gasPrice?: string;
  gasLimit?: string;
  networkFee?: string;
  baseFee?: string;
  priorityFee?: string;
}

/**
 * Exchange account
 */
export interface ExchangeAccount {
  id: string;
  name: string;
  type: string;
  status: string;
  assets: ExchangeAsset[];
}

/**
 * Exchange asset
 */
export interface ExchangeAsset {
  id: string;
  total: string;
  available: string;
  locked: string;
}

/**
 * Internal wallet
 */
export interface InternalWallet {
  id: string;
  name: string;
  customerRefId?: string;
  assets: WalletAsset[];
}

/**
 * External wallet
 */
export interface ExternalWallet {
  id: string;
  name: string;
  customerRefId?: string;
  assets: WalletAsset[];
}

/**
 * Wallet asset
 */
export interface WalletAsset {
  id: string;
  status: string;
  address: string;
  tag?: string;
  activationTxId?: string;
}

/**
 * Gas station settings
 */
export interface GasStationSettings {
  gasThreshold: string;
  gasCap: string;
  maxGasPrice?: string;
}

/**
 * Supported asset
 */
export interface SupportedAsset {
  id: string;
  name: string;
  type: string;
  contractAddress?: string;
  nativeAsset?: string;
  decimals?: number;
  issuerAddress?: string;
  blockchainSymbol?: string;
  deprecated?: boolean;
  coinType?: number;
}

/**
 * Blockchain information
 */
export interface BlockchainInfo {
  id: string;
  displayName: string;
  nativeAsset: string;
  deprecated: boolean;
}

/**
 * Staking chain
 */
export interface StakingChain {
  chainDescriptor: string;
  isSupported: boolean;
  minStake?: string;
  maxStake?: string;
  lockPeriod?: number;
}

/**
 * Staking position
 */
export interface StakingPosition {
  id: string;
  vaultAccountId: string;
  validatorAddress: string;
  providerName: string;
  chainDescriptor: string;
  amount: string;
  rewardsAmount: string;
  dateCreated: number;
  status: string;
}

/**
 * NFT token
 */
export interface NftToken {
  id: string;
  tokenId: string;
  standard: string;
  blockchainDescriptor: string;
  metadataURI?: string;
  cachedMetadataURI?: string;
  media?: NftMedia[];
  collection?: NftCollection;
  description?: string;
  name?: string;
  ownershipStatus: string;
  spam?: NftSpamInfo;
}

/**
 * NFT media
 */
export interface NftMedia {
  url: string;
  contentType: string;
}

/**
 * NFT collection
 */
export interface NftCollection {
  id: string;
  name: string;
  symbol?: string;
}

/**
 * NFT spam info
 */
export interface NftSpamInfo {
  isSpam: boolean;
  reason?: string;
}

/**
 * Smart contract template
 */
export interface ContractTemplate {
  id: string;
  name: string;
  description?: string;
  abi?: string;
  bytecode?: string;
  sourcecode?: string;
  compilerVersion?: string;
  vendorId?: string;
  isPublic?: boolean;
  type?: string;
}

/**
 * Deployed contract
 */
export interface DeployedContract {
  id: string;
  contractAddress: string;
  contractTemplateId: string;
  blockchainId: string;
  txHash?: string;
}

/**
 * Network connection
 */
export interface NetworkConnection {
  id: string;
  localChannel: NetworkChannel;
  remoteChannel: NetworkChannel;
  status: string;
}

/**
 * Network channel
 */
export interface NetworkChannel {
  networkId: string;
  name?: string;
}

/**
 * Network ID
 */
export interface NetworkId {
  id: string;
  name: string;
  isDiscoverable?: boolean;
  routingPolicy?: RoutingPolicy;
}

/**
 * Routing policy
 */
export interface RoutingPolicy {
  transactionType?: string;
  destAddressType?: string;
  crypto?: string;
  network?: string;
}

/**
 * Webhook configuration
 */
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: string;
  createdAt: number;
  lastUpdated: number;
}

/**
 * Webhook notification
 */
export interface WebhookNotification {
  id: string;
  webhookId: string;
  event: string;
  payload: string;
  status: string;
  createdAt: number;
  attempts: number;
}

/**
 * User
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  role: string;
}

/**
 * User group
 */
export interface UserGroup {
  id: string;
  name: string;
  memberIds: string[];
  status: string;
}

/**
 * Transaction Authorization Policy (TAP)
 */
export interface TransactionPolicy {
  rules: PolicyRule[];
}

/**
 * Policy rule
 */
export interface PolicyRule {
  transactionType: string;
  asset?: string;
  amount?: string;
  amountCurrency?: string;
  amountScope?: string;
  periodSec?: number;
  srcType?: string;
  srcSubType?: string;
  srcId?: string;
  dstType?: string;
  dstSubType?: string;
  dstId?: string;
  action: string;
  authorizationGroups?: AuthorizationGroup;
}

/**
 * Authorization group
 */
export interface AuthorizationGroup {
  th: number;
  users?: string[];
  groups?: string[];
}

/**
 * Fireblocks error response
 */
export interface FireblocksError {
  code: number;
  message: string;
  data?: Record<string, unknown>;
}

/**
 * Fireblocks webhook event types
 */
export type WebhookEventType =
  | 'TRANSACTION_CREATED'
  | 'TRANSACTION_STATUS_UPDATED'
  | 'TRANSACTION_APPROVAL_STATUS_UPDATED'
  | 'VAULT_ACCOUNT_ADDED'
  | 'VAULT_ACCOUNT_ASSET_ADDED'
  | 'INTERNAL_WALLET_ASSET_ADDED'
  | 'EXTERNAL_WALLET_ASSET_ADDED'
  | 'EXCHANGE_ACCOUNT_ADDED'
  | 'NETWORK_CONNECTION_ADDED'
  | 'NEW_BLOCK';

/**
 * Webhook event payload
 */
export interface WebhookEvent {
  type: WebhookEventType;
  tenantId: string;
  timestamp: number;
  data: Transaction | VaultAccount | ExchangeAccount | NetworkConnection | unknown;
}
