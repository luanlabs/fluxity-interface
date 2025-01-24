import { rpc, scValToNative, xdr } from '@stellar/stellar-sdk';

const { scvI128 } = xdr.ScVal;

const cancelStreamReturnValues = (finalize: rpc.Api.GetSuccessfulTransactionResponse) => {
  const senderXdr = Object(finalize?.returnValue)._value[0]._value;
  const receiverXdr = Object(finalize?.returnValue)._value[1]._value;

  const senderScVal = scvI128(senderXdr);
  const receiverScVal = scvI128(receiverXdr);

  const senderAmount = scValToNative(senderScVal);
  const receiverAmount = scValToNative(receiverScVal);
  return {
    senderAmount,
    receiverAmount,
  };
};

export default cancelStreamReturnValues;
