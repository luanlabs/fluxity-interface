import BigNumber from 'bignumber.js';
import { Contract } from 'stellar-sdk';

import ToScVal from 'src/utils/createLockup/scVal';
import getServer from 'src/utils/createLockup/getServer';
import getAccount from 'src/utils/createLockup/getAccount';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import toDecimals from 'src/utils/createLockup/toDecimals';
import createTransaction from 'src/utils/soroban/baseTransaction';

const approve = async (contractAddress: string, amount: BigNumber, address: string) => {
  const account = await getAccount(address);

  const server = getServer();
  const contract = new Contract(contractAddress);
  const { sequence } = await server.getLatestLedger();

  const from = ToScVal.address(address);
  const spender = ToScVal.address(FLUXITY_CONTRACT);
  const amountScVal = ToScVal.i128(toDecimals(amount));
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const call = contract.call('approve', from, spender, amountScVal, expirationLedger);
  const xdr = createTransaction(account, call);

  return await server.prepareTransaction(xdr);
};

export default approve;
