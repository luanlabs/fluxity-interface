import timeout from 'src/utils/timeout';
import getServer from 'src/utils/createStream/getSever';

const finalizeTransaction = async (hash: string) => {
  const server = getServer();

  for (let i = 0; i < 15; ++i) {
    const tx = await server.getTransaction(hash);

    if (tx.status === 'SUCCESS') {
      return true;
    }

    await timeout(1000);
  }

  return false;
};

export default finalizeTransaction;
