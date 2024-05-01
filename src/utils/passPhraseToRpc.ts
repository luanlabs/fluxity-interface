import { Futurenet, Mainnet, Testnet } from 'src/constants/networks';

const passPhraseToNetworkURL = (passPhrase: string) => {
  if (passPhrase === Mainnet.networkPassphrase) {
    return {
      sorobanRPC: Mainnet.sorobanRpcUrl,
      horizonRPC: Mainnet.networkUrl,
    };
  } else if (passPhrase === Futurenet.networkPassphrase) {
    return {
      sorobanRPC: Futurenet.sorobanRpcUrl,
      horizonRPC: Futurenet.networkUrl,
    };
  }

  return {
    sorobanRPC: Testnet.sorobanRpcUrl,
    horizonRPC: Testnet.networkUrl,
  };
};

export default passPhraseToNetworkURL;
