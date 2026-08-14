import logger from 'src/utils/logger';

import { ExternalPages } from './externalPages';
import { Mainnet, Testnet } from './networks';

/**
 * Runtime validation for the public configuration.
 *
 * Every variable consumed by the app is a `NEXT_PUBLIC_*` value and is inlined
 * at build time. These checks do not throw — a misconfigured frontend should
 * still render — but they emit clear warnings so deployment mistakes (a missing
 * API URL, a mainnet RPC left blank, an http:// endpoint) are caught early
 * instead of surfacing as opaque network failures.
 */

const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

let hasValidated = false;

export const validateEnv = (): void => {
  if (hasValidated) {
    return;
  }
  hasValidated = true;

  const urlChecks: Array<{ name: string; value: string }> = [
    { name: 'NEXT_PUBLIC_FLUXITY_API', value: ExternalPages.FLUXITY_API },
    { name: 'NEXT_PUBLIC_TESTNET_HORIZONURL', value: Testnet.networkUrl },
    { name: 'NEXT_PUBLIC_TESTNET_SOROBAN_RPCURL', value: Testnet.sorobanRpcUrl },
    { name: 'NEXT_PUBLIC_MAINNET_HORIZONURL', value: Mainnet.networkUrl },
    { name: 'NEXT_PUBLIC_MAINNET_SOROBAN_RPCURL', value: Mainnet.sorobanRpcUrl },
  ];

  for (const { name, value } of urlChecks) {
    if (!value) {
      logger.warn(`Missing required configuration: ${name} is not set.`);
    } else if (!isHttpUrl(value)) {
      logger.warn(`Invalid URL for ${name}: "${value}".`);
    }
  }

  if (!Testnet.contract) {
    logger.warn('NEXT_PUBLIC_TESTNET_CONTRACT is not set; testnet contract calls will fail.');
  }
  if (!Mainnet.contract) {
    logger.warn('NEXT_PUBLIC_MAINNET_CONTRACT is not set; mainnet contract calls will fail.');
  }
};

export default validateEnv;
