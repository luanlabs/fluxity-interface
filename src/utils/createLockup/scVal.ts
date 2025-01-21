import { xdr, Address } from '@stellar/stellar-sdk';

import numberToScVal from 'src/utils/soroban/numberToScVal';
import toXdrValue from 'src/utils/soroban/createStreamValues';
import { FormValues } from 'src/containers/CreateLockup';

import { OperationType } from 'src/models';

const { scvU32, scvU64, scvSymbol, scvBool } = xdr.ScVal;

class ToScVal {
  public static i128(value: bigint) {
    return numberToScVal(value);
  }
  public static u32(number: number) {
    return scvU32(number);
  }
  public static address(address: string) {
    return Address.fromString(address).toScVal();
  }
  public static u64(number: string) {
    return scvU64(xdr.Uint64.fromString(number));
  }
  public static symbol(symbol: string) {
    return scvSymbol(symbol);
  }
  public static boolean(bool: boolean) {
    return scvBool(bool);
  }
  public static toXdr(params: FormValues, address: string, opertaionType: OperationType) {
    return toXdrValue(params, address, opertaionType);
  }
}

export default ToScVal;
