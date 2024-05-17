import { Asset } from '@stellar/stellar-sdk';
import { HorizonApi } from '@stellar/stellar-sdk/lib/horizon';

const getContractIdFromAsset = async (
  userBalances: HorizonApi.BalanceLineAsset[],
  networkPassphrase: string,
) => {
  const filteredAsset = userBalances.filter(
    (asset: HorizonApi.BalanceLine) => asset.asset_type != 'native',
  );

  return filteredAsset.map((asset) =>
    new Asset(asset.asset_code, asset.asset_issuer).contractId(networkPassphrase),
  );
};

export default getContractIdFromAsset;
