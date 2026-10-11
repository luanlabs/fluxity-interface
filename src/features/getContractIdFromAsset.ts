import { Asset, Horizon, StrKey } from '@stellar/stellar-sdk';

export type UserBalancesType = Horizon.HorizonApi.BalanceLine;

const getContractIdFromAsset = (userBalances: UserBalancesType[], networkPassphrase: string) => {
  return userBalances.flatMap((asset) => {
    if (asset?.asset_type === 'native') {
      return [Asset.native().contractId(networkPassphrase)];
    }

    // Liquidity-pool shares have no issuer and cannot be converted to a token contract.
    if (asset?.asset_type !== 'credit_alphanum4' && asset?.asset_type !== 'credit_alphanum12') {
      return [];
    }

    if (
      typeof asset.asset_code !== 'string' ||
      !/^[a-zA-Z0-9]{1,12}$/.test(asset.asset_code) ||
      typeof asset.asset_issuer !== 'string' ||
      !StrKey.isValidEd25519PublicKey(asset.asset_issuer)
    ) {
      return [];
    }

    return [new Asset(asset.asset_code, asset.asset_issuer).contractId(networkPassphrase)];
  });
};

export default getContractIdFromAsset;
