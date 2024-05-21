import { Horizon, SorobanRpc } from '@stellar/stellar-sdk';
import { ExternalPages } from 'src/constants/externalPages';

const getConfigs = () => {
  const horizonServer = new Horizon.Server(ExternalPages.HORIZON_TESTNET);
  const sorobanServer = new SorobanRpc.Server(ExternalPages.SOROBAN_TESTNET_RPC);

  return {
    horizonServer,
    sorobanServer,
  };
};

export default getConfigs;
