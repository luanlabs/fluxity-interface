import freighterApi from '@stellar/freighter-api';
import { Networks, Transaction } from 'soroban-client';

import toast from 'src/components/CToast';
import approve from 'src/features/soroban/approve';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { FormValues } from 'src/containers/CreateStreamMainCard';
import createStream from 'src/features/soroban/createStream';

const signedXdr = async (values: FormValues, address: string, func: 'approve' | 'createStream') => {
  let xdrVal;
  if (func === 'approve') {
    xdrVal = await approve(calculateTotalAmount(values), address);
  } else if (func === 'createStream') {
    xdrVal = await createStream(values, address);
  }
  if (xdrVal) {
    return await freighterApi
      .signTransaction(xdrVal.toXDR(), {
        networkPassphrase: Networks.FUTURENET,
        accountToSign: address,
      })
      .then((res) => new Transaction(res, Networks.FUTURENET))
      .catch(() => toast('error', 'Approve rejected'));
  }
};

export default signedXdr;
