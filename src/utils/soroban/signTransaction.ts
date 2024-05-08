import freighterApi from '@stellar/freighter-api';
import { Transaction } from '@stellar/stellar-sdk';

const signTransaction = async (address: string, passPhrase: string, xdr: any) => {
  const signedXdr = await freighterApi.signTransaction(xdr.toXDR(), {
    networkPassphrase: passPhrase,
    accountToSign: address,
  });

  return new Transaction(signedXdr, passPhrase);
};

export default signTransaction;
