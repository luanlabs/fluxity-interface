import { Futurenet, Mainnet, Testnet } from 'src/constants/networks';

const nameToNetworkDetail = (networkName: string) => {
  if (networkName === Mainnet.network) {
    return Mainnet;
  } else if (networkName === Futurenet.network) {
    return Futurenet;
  }

  return Testnet;
};

export default nameToNetworkDetail;
