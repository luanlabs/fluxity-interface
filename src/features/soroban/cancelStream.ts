import ToScVal from 'src/utils/createLockup/scVal';

import sorobanSend from './sorobanSend';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const cancelStream = async (passPhrase: string, address: string, id: string) => {
  const idScVal = ToScVal.u64(id);

  const tx = await sorobanSend(
    address,
    passPhrase,
    passPhraseToNetworkDetail(passPhrase).contract,
    'cancel_lockup',
    [idScVal],
  );

  return tx;
};

export default cancelStream;
