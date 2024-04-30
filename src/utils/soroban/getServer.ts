import { SorobanRpc } from '@stellar/stellar-sdk';

import passPhraseToRpc from '../passPhraseToRpc';

const getServer = (passPhrase: string) => {
  return new SorobanRpc.Server(passPhraseToRpc(passPhrase));
};
export default getServer;
