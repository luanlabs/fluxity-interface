import ToScVal from 'src/utils/createLockup/scVal';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import { FormValues, operationType } from 'src/containers/CreateLockup';

import sorobanSend from './sorobanSend';

const createLockup = async (
  passPhrase: string,
  address: string,
  params: FormValues,
  operationType: operationType,
) => {
  const paramsScVal = ToScVal.toXdr(params, address);

  const tx = await sorobanSend(address, passPhrase, FLUXITY_CONTRACT, `create_${operationType}`, [
    paramsScVal,
  ]);

  return tx;
};

export default createLockup;
