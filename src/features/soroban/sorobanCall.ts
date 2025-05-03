import { Contract, xdr, scValToNative, rpc } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';
import createTransaction from 'src/utils/soroban/baseTransaction';
import { store } from 'src/store';
import { updateRequest } from 'src/reducers/request';

const sorobanCall = async <T>(
  user: string,
  passPhrase: string,
  contractAddress: string,
  callSignature: string,
  callParameters?: xdr.ScVal[],
) => {
  const dispatch = store.dispatch;
  dispatch(updateRequest(1));

  const state = store.getState();
  const requestCount = state.requests.count;
  console.log(requestCount);

  const { soroban: server } = getServer(passPhrase);
  const account = await server.getAccount(user);
  const contract = new Contract(contractAddress);

  let call = contract.call(callSignature);

  if (callParameters) {
    call = contract.call(callSignature, ...callParameters);
  }

  const transactionResult = createTransaction(account, passPhrase, call);

  const txSimulate = await server.simulateTransaction(transactionResult);

  if (!rpc.Api.isSimulationSuccess(txSimulate)) {
    throw Error('Failed to fetch data');
  }

  if (!txSimulate.result?.retval) {
    throw Error('No data returned');
  }

  let retval: T = scValToNative(txSimulate.result.retval);

  return retval;
};

export default sorobanCall;
