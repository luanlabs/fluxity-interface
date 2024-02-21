import timeout from 'src/utils/timeout';
import getServer from 'src/utils/createStream/getServer';

const finalizeTransaction = async (hash: string) => {
  const server = getServer();

  for (let i = 0; i < 15; ++i) {
    const tx = await server.getTransaction(hash);

    console.log(JSON.stringify(tx, null, 4));

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
