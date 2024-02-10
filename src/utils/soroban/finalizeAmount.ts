import { scValToNative, xdr } from 'stellar-sdk';
import { Api } from 'stellar-sdk/lib/soroban';

const { scvI128 } = xdr.ScVal;

export type operationType = 'cancel' | 'withdraw';

const finalizeAmount = (
  finalize: Api.GetSuccessfulTransactionResponse,
  operation: operationType,
) => {
  if (operation === 'cancel') {
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
  }
  const withdrawXdr = Object(finalize?.returnValue)._value;
  const withdrawScVal = scvI128(withdrawXdr);

  return scValToNative(withdrawScVal);
};

export default finalizeAmount;
