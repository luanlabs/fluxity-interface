import ToScVal from 'src/utils/createLockup/scVal';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import { FormValues } from 'src/containers/CreateLockup';
import { OperationType } from 'src/models';
import sorobanSend from './sorobanSend';

const createLockup = async (
  passPhrase: string,
  address: string,
  params: FormValues,
  operationType: OperationType,
) => {
  const paramsScVal = ToScVal.toXdr(params, address);

  const tx = await sorobanSend(address, passPhrase, FLUXITY_CONTRACT, `create_${operationType}`, [
    paramsScVal,
  ]);

  return tx;
};

export default createLockup;
