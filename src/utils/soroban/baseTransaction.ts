import {
  TransactionBuilder,
  Networks,
  Account,
  xdr,
  Operation,
} from "soroban-client";

const createTransaction = (
  account: Account,
  call: xdr.Operation<Operation.InvokeHostFunction>
) => {
  // TODO: use getfee here
  const fee = "100000";

  let transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: Networks.FUTURENET,
  });

  transaction = transaction.addOperation(call);
  transaction = transaction.setTimeout(30);

  return transaction.build();
};

export default createTransaction;
