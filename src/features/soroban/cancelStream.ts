import { Contract } from '@stellar/stellar-sdk';

import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import ToScVal from 'src/utils/createLockup/scVal';
import getServer from 'src/utils/soroban/getServer';
import getAccount from 'src/utils/createLockup/getAccount';
import createTransaction from 'src/utils/soroban/baseTransaction';

const cancelStream = async (id: string, passPhrase: string, address: string) => {
  const account = await getAccount(address, passPhrase);

  const server = getServer(passPhrase);
  const contract = new Contract(FLUXITY_CONTRACT);

  const call = contract.call('cancel_stream', ToScVal.u64(id));
  const xdr = createTransaction(account, passPhrase, call);

  return await server.prepareTransaction(xdr);
};

export default cancelStream;
