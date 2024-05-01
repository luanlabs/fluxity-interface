import { Horizon, SorobanRpc } from '@stellar/stellar-sdk';

import passPhraseToNetworkURL from '../passPhraseToRpc';

const getServer = (passPhrase: string) => {
  const { sorobanRPC, horizonRPC } = passPhraseToNetworkURL(passPhrase);

  return {
    soroban: new SorobanRpc.Server(sorobanRPC),
    horizon: new Horizon.Server(horizonRPC),
  };
};
export default getServer;
