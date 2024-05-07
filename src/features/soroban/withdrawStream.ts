import ToScVal from 'src/utils/createLockup/scVal';

import sorobanSend from './sorobanSend';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const withdrawStream = async (passPhrase: string, address: string, id: string) => {
  const idScVal = ToScVal.u64(id);
  const amountScVal = ToScVal.i128(BigInt(0));

  const tx = await sorobanSend(
    address,
    passPhrase,
    passPhraseToNetworkDetail(passPhrase).contract,
    'withdraw_lockup',
    [idScVal, amountScVal],
  );

  return tx;
};

export default withdrawStream;
