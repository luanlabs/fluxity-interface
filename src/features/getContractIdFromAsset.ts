import { Asset, Horizon } from '@stellar/stellar-sdk';

export type UserBalancesType =
  Horizon.HorizonApi.BalanceLineNative | Horizon.HorizonApi.BalanceLineAsset;

const getContractIdFromAsset = (userBalances: UserBalancesType[], networkPassphrase: string) => {
  return userBalances.map((asset) => {
    if (asset.asset_type === 'native') {
      return Asset.native().contractId(networkPassphrase);
    }

    return new Asset(asset.asset_code, asset.asset_issuer).contractId(networkPassphrase);
  });
};

export default getContractIdFromAsset;
