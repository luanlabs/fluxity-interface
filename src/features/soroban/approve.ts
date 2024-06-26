import BigNumber from 'bignumber.js';

import ToScVal from 'src/utils/createLockup/scVal';
import getServer from 'src/utils/soroban/getServer';
import toDecimals from 'src/utils/createLockup/toDecimals';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

import sorobanSend from './sorobanSend';

const approve = async (
  contractAddress: string,
  passPhrase: string,
  address: string,
  amount: BigNumber,
) => {
  const { soroban: server } = getServer(passPhrase);
  const { sequence } = await server.getLatestLedger();

  const from = ToScVal.address(address);
  const spender = ToScVal.address(passPhraseToNetworkDetail(passPhrase).contract);
  const amountScVal = ToScVal.i128(toDecimals(amount));
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const tx = await sorobanSend(address, passPhrase, contractAddress, 'approve', [
    from,
    spender,
    amountScVal,
    expirationLedger,
  ]);

  return tx;
};

export default approve;
