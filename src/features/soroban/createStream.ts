import { Contract } from 'stellar-sdk';

import ToScVal from 'src/utils/createStream/scVal';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import { FormValues } from 'src/containers/CreateStreamMainCard';
import createTransaction from 'src/utils/soroban/baseTransaction';

const createStream = async (params: FormValues, address: string) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = new Contract(FLUXITY_CONTRACT);

  const paramsScVal = ToScVal.toXdr(params, address);

  const call = contract.call('create_stream', paramsScVal);
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default createStream;
