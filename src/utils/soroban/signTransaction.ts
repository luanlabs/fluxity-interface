import freighterApi from '@stellar/freighter-api';
import { Networks, Transaction } from 'stellar-sdk';

const signTransaction = async (address: string, xdr: any) => {
  const signedXdr = await freighterApi.signTransaction(xdr.toXDR(), {
    networkPassphrase: Networks.FUTURENET,
    accountToSign: address,
  });

  return new Transaction(signedXdr, Networks.FUTURENET);
};

export default signTransaction;
