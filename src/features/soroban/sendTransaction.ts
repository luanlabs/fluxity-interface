import { Memo, MemoType, Operation, Transaction } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';

const sendTransaction = async (
  signedXDR: Transaction<Memo<MemoType>, Operation[]>,
  passPhrase: string,
) => {
  const { soroban: server } = getServer(passPhrase);

  let tx = await server.sendTransaction(signedXDR);

  return tx;
};

export default sendTransaction;
