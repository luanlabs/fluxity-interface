import { Server } from 'soroban-client';

const getServer = () => {
  return new Server('https://rpc-futurenet.stellar.org');
};
export default getServer;
