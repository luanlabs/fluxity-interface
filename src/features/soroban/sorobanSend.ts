import { Contract, xdr } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';
import createTransaction from 'src/utils/soroban/baseTransaction';

const sorobanSend = async (
  user: string,
  passPhrase: string,
  contractAddress: string,
  callSignature: string,
  callParameters?: xdr.ScVal[],
) => {
  const { soroban: server } = getServer(passPhrase);
  const account = await server.getAccount(user);

  const contract = new Contract(contractAddress);

  let call = contract.call(callSignature);

  if (callParameters) {
    call = contract.call(callSignature, ...callParameters);
  }

  const xdr = createTransaction(account, passPhrase, call);

  return await server.prepareTransaction(xdr);
};

export default sorobanSend;
