import { scValToNative, xdr } from '@stellar/stellar-sdk';
import { Api } from '@stellar/stellar-sdk/lib/soroban';

const { scvI128 } = xdr.ScVal;

const withdrawStreamReturnValue = (finalize: Api.GetSuccessfulTransactionResponse) => {
  const withdrawXdr = Object(finalize?.returnValue)._value;
  const withdrawScVal = scvI128(withdrawXdr);

  return scValToNative(withdrawScVal);
};

export default withdrawStreamReturnValue;
