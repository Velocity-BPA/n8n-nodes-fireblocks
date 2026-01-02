/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Fireblocks peer types for transaction source/destination
 */
export const PEER_TYPES = {
  VAULT_ACCOUNT: 'VAULT_ACCOUNT',
  EXCHANGE_ACCOUNT: 'EXCHANGE_ACCOUNT',
  INTERNAL_WALLET: 'INTERNAL_WALLET',
  EXTERNAL_WALLET: 'EXTERNAL_WALLET',
  FIAT_ACCOUNT: 'FIAT_ACCOUNT',
  NETWORK_CONNECTION: 'NETWORK_CONNECTION',
  COMPOUND: 'COMPOUND',
  GAS_STATION: 'GAS_STATION',
  ONE_TIME_ADDRESS: 'ONE_TIME_ADDRESS',
  OEC_PARTNER: 'OEC_PARTNER',
  END_USER_WALLET: 'END_USER_WALLET',
} as const;

export type PeerTypeKey = keyof typeof PEER_TYPES;

/**
 * Peer type options for n8n dropdowns
 */
export const PEER_TYPE_OPTIONS = [
  { name: 'Vault Account', value: 'VAULT_ACCOUNT' },
  { name: 'Exchange Account', value: 'EXCHANGE_ACCOUNT' },
  { name: 'Internal Wallet', value: 'INTERNAL_WALLET' },
  { name: 'External Wallet', value: 'EXTERNAL_WALLET' },
  { name: 'Fiat Account', value: 'FIAT_ACCOUNT' },
  { name: 'Network Connection', value: 'NETWORK_CONNECTION' },
  { name: 'Compound', value: 'COMPOUND' },
  { name: 'Gas Station', value: 'GAS_STATION' },
  { name: 'One Time Address', value: 'ONE_TIME_ADDRESS' },
  { name: 'OEC Partner', value: 'OEC_PARTNER' },
  { name: 'End User Wallet', value: 'END_USER_WALLET' },
];

/**
 * Exchange types
 */
export const EXCHANGE_TYPES = {
  BINANCE: 'BINANCE',
  BINANCE_US: 'BINANCE_US',
  BITFINEX: 'BITFINEX',
  BITHUMB: 'BITHUMB',
  BITMEX: 'BITMEX',
  BITSTAMP: 'BITSTAMP',
  BITTREX: 'BITTREX',
  BYBIT: 'BYBIT',
  CIRCLE: 'CIRCLE',
  COINBASE: 'COINBASE',
  COINBASE_PRO: 'COINBASE_PRO',
  CRYPTO_COM: 'CRYPTO_COM',
  DERIBIT: 'DERIBIT',
  FTX: 'FTX',
  GEMINI: 'GEMINI',
  HUOBI: 'HUOBI',
  KRAKEN: 'KRAKEN',
  KUCOIN: 'KUCOIN',
  LIQUID: 'LIQUID',
  OKX: 'OKX',
  POLONIEX: 'POLONIEX',
} as const;

export type ExchangeTypeKey = keyof typeof EXCHANGE_TYPES;

/**
 * Exchange type options for n8n dropdowns
 */
export const EXCHANGE_TYPE_OPTIONS = Object.entries(EXCHANGE_TYPES).map(([key, value]) => ({
  name: key.replace(/_/g, ' '),
  value,
}));

/**
 * Asset types
 */
export const ASSET_TYPES = {
  BASE_ASSET: 'BASE_ASSET',
  ERC20: 'ERC20',
  BEP20: 'BEP20',
  COMPOUND: 'COMPOUND',
  FIAT: 'FIAT',
  NFT: 'NFT',
  ALGO_ASSET: 'ALGO_ASSET',
  SOL_ASSET: 'SOL_ASSET',
  TRON_TOKEN: 'TRON_TOKEN',
} as const;

export type AssetTypeKey = keyof typeof ASSET_TYPES;
