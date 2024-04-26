import { Contract } from 'stellar-sdk';

import { OperationType } from 'src/models';
import ToScVal from 'src/utils/createLockup/scVal';
import { FormValues } from 'src/containers/CreateLockup';
import getServer from 'src/utils/createLockup/getServer';
import getAccount from 'src/utils/createLockup/getAccount';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import createTransaction from 'src/utils/soroban/baseTransaction';

const createLockup = async (params: FormValues, address: string, operationType: OperationType) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = new Contract(FLUXITY_CONTRACT);

  const paramsScVal = ToScVal.toXdr(params, address);

  const call = contract.call(`create_${operationType}`, paramsScVal);
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default createLockup;
