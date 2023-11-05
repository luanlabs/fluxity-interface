import { TransactionBuilder, Networks, Account, xdr, Operation } from 'soroban-client';

import getFee from 'src/utils/createStream/getFee';

const createTransaction = (account: Account, call: xdr.Operation<Operation.InvokeHostFunction>) => {
  const fee = getFee();

  let transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: Networks.FUTURENET,
  });

  transaction = transaction.addOperation(call);
  transaction = transaction.setTimeout(30);

  return transaction.build();
};

export default createTransaction;
