import { Memo, MemoType, Operation, SorobanRpc, Transaction } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';

const sendTransaction = async (
  signedXDR: Transaction<Memo<MemoType>, Operation[]> | void,
  passPhrase: string,
) => {
  const server = getServer(passPhrase);

  let tx: SorobanRpc.Api.SendTransactionResponse;

  if (signedXDR) {
    tx = await server.sendTransaction(signedXDR);

    return tx;
  }
};

export default sendTransaction;
