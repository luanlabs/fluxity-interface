import { SorobanRpc } from 'stellar-sdk';

const getServer = () => {
  return new SorobanRpc.Server('https://rpc-futurenet.stellar.org');
};
export default getServer;
