import ToScVal from 'src/utils/createLockup/scVal';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';

import sorobanSend from './sorobanSend';

const cancelStream = async (passPhrase: string, address: string, id: string) => {
  const idScVal = ToScVal.u64(id);

  const tx = await sorobanSend(address, passPhrase, FLUXITY_CONTRACT, 'cancel_lockup', [idScVal]);

  return tx;
};

export default cancelStream;
