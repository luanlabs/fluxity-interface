import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import ToScVal from 'src/utils/createStream/scVal';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import getContract from 'src/utils/createStream/getContract';
import createTransaction from 'src/utils/soroban/baseTransaction';

const withdrawStream = async (id: string, amount: bigint, address: string) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = getContract(FLUXITY_CONTRACT);

  const call = contract.call('cancel_stream', ToScVal.u64(id), ToScVal.i128(amount));
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default withdrawStream;
