import BigNumber from 'bignumber.js';

import ToScVal from 'src/utils/createStream/scVal';
import { FUSDC } from 'src/constants/contracts';
import getContract from 'src/utils/createStream/getContract';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import toDecimals from 'src/utils/createStream/toDecimals';
import createTransaction from 'src/utils/soroban/baseTransaction';

const approve = async (amount: BigNumber, address: string) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = getContract(FUSDC);
  const { sequence } = await server.getLatestLedger();

  const from = ToScVal.address(address);
  const spender = ToScVal.address('CCMM75FF2CRL426O6X4ENCKPF7VQHQZLU2QC3IWRNZXQNKAFSXPVFDDM');
  const amountScVal = ToScVal.i128(toDecimals(amount));
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const call = contract.call('approve', from, spender, amountScVal, expirationLedger);
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default approve;
