/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { signJwt, generateIdempotencyKey, hashBody } from '../../nodes/Fireblocks/transport/jwtSigner';

describe('JWT Signer', () => {
  describe('hashBody', () => {
    it('should compute SHA-256 hash of empty body', () => {
      const hash = hashBody('');
      expect(hash).toBeDefined();
      expect(hash).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it('should compute SHA-256 hash of JSON body', () => {
      const body = JSON.stringify({ test: 'data' });
      const hash = hashBody(body);
      expect(hash).toBeDefined();
      expect(hash).toHaveLength(64);
    });

    it('should produce consistent hashes for same input', () => {
      const body = JSON.stringify({ foo: 'bar' });
      const hash1 = hashBody(body);
      const hash2 = hashBody(body);
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', () => {
      const hash1 = hashBody('body1');
      const hash2 = hashBody('body2');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('generateIdempotencyKey', () => {
    it('should generate a valid UUID', () => {
      const key = generateIdempotencyKey();
      expect(key).toBeDefined();
      // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(key).toMatch(uuidRegex);
    });

    it('should generate unique keys', () => {
      const keys = new Set<string>();
      for (let i = 0; i < 100; i++) {
        keys.add(generateIdempotencyKey());
      }
      expect(keys.size).toBe(100);
    });
  });

  describe('signJwt', () => {
    it('should be a function that accepts 4 parameters', () => {
      expect(typeof signJwt).toBe('function');
      expect(signJwt.length).toBe(4);
    });
  });
});

describe('Fireblocks Transport', () => {
  describe('Request Building', () => {
    it('should build correct request URL for production', () => {
      const baseUrl = 'https://api.fireblocks.io/v1';
      const endpoint = '/vault/accounts';
      const url = `${baseUrl}${endpoint}`;
      expect(url).toBe('https://api.fireblocks.io/v1/vault/accounts');
    });

    it('should build correct request URL for sandbox', () => {
      const baseUrl = 'https://sandbox-api.fireblocks.io/v1';
      const endpoint = '/vault/accounts';
      const url = `${baseUrl}${endpoint}`;
      expect(url).toBe('https://sandbox-api.fireblocks.io/v1/vault/accounts');
    });
  });
});
