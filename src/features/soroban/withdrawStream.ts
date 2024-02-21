import { Contract } from 'stellar-sdk';

import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import ToScVal from 'src/utils/createStream/scVal';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import createTransaction from 'src/utils/soroban/baseTransaction';

const withdrawStream = async (id: string, address: string) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = new Contract(FLUXITY_CONTRACT);

  const call = contract.call('withdraw_stream', ToScVal.u64(id), ToScVal.i128(BigInt(0)));
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default withdrawStream;
