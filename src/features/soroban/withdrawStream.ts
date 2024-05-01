import ToScVal from 'src/utils/createLockup/scVal';

import sorobanSend from './sorobanSend';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';

const withdrawStream = async (passPhrase: string, address: string, id: string) => {
  const idScVal = ToScVal.u64(id);
  const amountScVal = ToScVal.i128(BigInt(0));

  const tx = await sorobanSend(address, passPhrase, FLUXITY_CONTRACT, 'withdraw_lockup', [
    idScVal,
    amountScVal,
  ]);

  return tx;
};

export default withdrawStream;
