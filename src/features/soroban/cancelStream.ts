import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import ToScVal from 'src/utils/createStream/scVal';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import getContract from 'src/utils/createStream/getContract';
import createTransaction from 'src/utils/soroban/baseTransaction';

const cancelStream = async (id: string, address: string) => {
  console.log(address);

  const account = await getAccount(address);
  console.log('sfffffs');

  const server = getServer();
  const contract = getContract(FLUXITY_CONTRACT);
  console.log(ToScVal.u64(id));

  const call = contract.call('cancel_stream', ToScVal.u64(id));
  const xdr = createTransaction(account, call);
  console.log('ss');

  return await server.prepareTransaction(xdr);
};

export default cancelStream;
