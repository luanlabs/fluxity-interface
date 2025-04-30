import { Asset } from '@stellar/stellar-sdk';
import { HorizonApi } from '@stellar/stellar-sdk/lib/horizon';

export type UserBalancesType = HorizonApi.BalanceLineNative | HorizonApi.BalanceLineAsset;

const getContractIdFromAsset = (userBalances: UserBalancesType[], networkPassphrase: string) => {
  return userBalances.map((asset) => {
    if (asset.asset_type === 'native') {
      return Asset.native().contractId(networkPassphrase);
    }

    return new Asset(asset.asset_code, asset.asset_issuer).contractId(networkPassphrase);
  });
};

export default getContractIdFromAsset;
