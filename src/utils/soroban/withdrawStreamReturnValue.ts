import { rpc, scValToNative, xdr } from '@stellar/stellar-sdk';

const { scvI128 } = xdr.ScVal;

const withdrawStreamReturnValue = (finalize: rpc.Api.GetSuccessfulTransactionResponse) => {
  const withdrawXdr = Object(finalize?.returnValue)._value;
  const withdrawScVal = scvI128(withdrawXdr);

  return scValToNative(withdrawScVal);
};

export default withdrawStreamReturnValue;
