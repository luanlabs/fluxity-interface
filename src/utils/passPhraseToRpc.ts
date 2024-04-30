import { Futurenet, Mainnet, Testnet } from 'src/constants/networks';

const passPhraseToRpc = (passPhrase: string) => {
  if (passPhrase === Mainnet.networkPassphrase) {
    return Mainnet.sorobanRpcUrl;
  } else if (passPhrase === Futurenet.networkPassphrase) {
    return Futurenet.sorobanRpcUrl;
  }
  return Testnet.sorobanRpcUrl;
};

export default passPhraseToRpc;
