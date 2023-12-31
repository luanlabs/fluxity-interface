import { Memo, MemoType, Operation, SorobanRpc, Transaction } from 'stellar-sdk';

import getServer from 'src/utils/createStream/getServer';

const sendTransaction = async (signedXDR: Transaction<Memo<MemoType>, Operation[]> | void) => {
  const server = getServer();

  let tx: SorobanRpc.Api.SendTransactionResponse;

  if (signedXDR) {
    tx = await server.sendTransaction(signedXDR);

    return tx;
  }
};

export default sendTransaction;
