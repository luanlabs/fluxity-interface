import { Memo, MemoType, Operation, SorobanRpc, Transaction } from 'soroban-client';
import getServer from 'src/utils/createStream/getSever';

const sendTransaction = async (signedXDR: Transaction<Memo<MemoType>, Operation[]> | void) => {
  const server = getServer();
  let tx: SorobanRpc.SendTransactionResponse;
  if (signedXDR) {
    tx = await server.sendTransaction(signedXDR);
    return tx;
  }
};

export default sendTransaction;
