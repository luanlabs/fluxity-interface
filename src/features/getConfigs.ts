import { Horizon, SorobanRpc } from '@stellar/stellar-sdk';
import { ExternalPages } from 'src/constants/externalPages';

const getConfigs = () => {
  const horizonServer = new Horizon.Server(ExternalPages.HORIZON_RPC);
  const sorobanServer = new SorobanRpc.Server(ExternalPages.SOROBAN_RPC);

  return {
    horizonServer,
    sorobanServer,
  };
};

export default getConfigs;
