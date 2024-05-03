import { Asset, Networks } from 'stellar-sdk';

import getConfigs from './getConfigs';

const getContractIdFromAsset = async (address: string) => {
  const { horizonServer } = getConfigs();

  const accountData = await horizonServer.loadAccount(address);
  const accountBalances = accountData.balances;

  const filteredAsset = accountBalances.filter(
    (asset) => asset.asset_type != 'native' && asset.asset_type != 'liquidity_pool_shares',
  );

  return filteredAsset.map((asset) =>
    new Asset(asset.asset_code, asset.asset_issuer).contractId(Networks.TESTNET),
  );
};

export default getContractIdFromAsset;
