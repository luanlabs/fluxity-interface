import ToScVal from 'src/utils/createLockup/scVal';
import { FormValues } from 'src/containers/CreateLockup';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';
import { OperationType } from 'src/models';

import sorobanSend from './sorobanSend';

const createLockup = async (
  passPhrase: string,
  address: string,
  params: FormValues,
  operationType: OperationType,
) => {
  const paramsScVal = ToScVal.toXdr(params, address, operationType);

  const tx = await sorobanSend(
    address,
    passPhrase,
    passPhraseToNetworkDetail(passPhrase).contract,
    `create_lockup`,
    [paramsScVal],
  );

  return tx;
};

export default createLockup;
