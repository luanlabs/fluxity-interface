import timeout from 'src/utils/timeout';
import getServer from 'src/utils/soroban/getServer';

const finalizeTransaction = async (hash: string, passPhrase: string) => {
  const server = getServer(passPhrase);

  for (let i = 0; i < 15; ++i) {
    const tx = await server.getTransaction(hash);

    if (tx.status === 'SUCCESS') {
      return tx;
    }

    if (tx.status === 'FAILED') {
      break;
    }

    await timeout(1000);
  }

  return null;
};

export default finalizeTransaction;
