import { useEffect, useRef } from 'react';
import { StrKey } from '@stellar/stellar-sdk';

import { Testnet } from 'src/constants/networks';
import { ExternalPages } from 'src/constants/externalPages';

const fundingRequests = new Map<string, Promise<void>>();

const accountExists = async (address: string) => {
  const horizonUrl = new URL(
    `accounts/${encodeURIComponent(address)}`,
    `${Testnet.networkUrl.replace(/\/+$/, '')}/`,
  );
  const response = await fetch(horizonUrl);

  if (response.ok) {
    return true;
  }

  if (response.status === 404) {
    return false;
  }

  throw new Error(`Could not check the testnet account (HTTP ${response.status}).`);
};

const fundTestnetAccount = async (address: string) => {
  if (await accountExists(address)) {
    return;
  }

  const friendbotUrl = new URL(ExternalPages.FRIENDBOT);
  friendbotUrl.searchParams.set('addr', address);

  const response = await fetch(friendbotUrl);

  if (response.ok) {
    return;
  }

  // Another request may have funded the account between the Horizon check and
  // Friendbot call. Treat that race as success.
  if (await accountExists(address)) {
    return;
  }

  throw new Error(`Friendbot funding failed (HTTP ${response.status}).`);
};

const ensureTestnetAccountIsFunded = (address: string) => {
  const existingRequest = fundingRequests.get(address);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fundTestnetAccount(address).finally(() => {
    fundingRequests.delete(address);
  });

  fundingRequests.set(address, request);
  return request;
};

const useFundTestnetAccount = (
  address: string,
  isAuthenticated: boolean,
  isReady: boolean,
) => {
  const attemptedAddress = useRef<string>();

  useEffect(() => {
    if (!isAuthenticated || !address) {
      attemptedAddress.current = undefined;
      return;
    }

    if (!isReady || attemptedAddress.current === address) {
      return;
    }

    if (!StrKey.isValidEd25519PublicKey(address)) {
      console.warn('Friendbot only supports Stellar G addresses.');
      return;
    }

    attemptedAddress.current = address;

    void ensureTestnetAccountIsFunded(address).catch((error: unknown) => {
      if (attemptedAddress.current === address) {
        attemptedAddress.current = undefined;
      }

      console.error('Failed to automatically fund the testnet account with Friendbot.', error);
    });
  }, [address, isAuthenticated, isReady]);
};

export default useFundTestnetAccount;
