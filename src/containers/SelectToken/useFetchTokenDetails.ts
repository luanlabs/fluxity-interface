import { useMemo } from 'react';
import { useBalances, useBlux, useNetwork, useReadContracts } from '@bluxcc/react';
import BN from 'src/utils/BN';

import { ITokenDetails } from 'src/models';
import { useAppSelector } from 'src/hooks/useRedux';
import getContractIdFromAsset from 'src/features/getContractIdFromAsset';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const useFetchTokenDetails = () => {
  const { user } = useBlux();
  const networkPassphrase = useNetwork();
  const address = user?.address ?? '';
  const { data: userBalances = [] } = useBalances(undefined, {
    enabled: Boolean(address),
  });
  const tokensFromStore = useAppSelector((store) => store.tokens);
  const contracts = useMemo(
    () => getContractIdFromAsset(userBalances, networkPassphrase),
    [networkPassphrase, userBalances],
  );
  const calls = useMemo(
    () =>
      contracts.flatMap((contract) => [
        { address: contract, fn: 'balance', args: [address] },
        { address: contract, fn: 'symbol', args: [] },
        { address: contract, fn: 'decimals', args: [] },
      ]),
    [address, contracts],
  );
  const { data: tokenDetails } = useReadContracts(
    calls,
    { network: networkPassphrase },
    {
      enabled: Boolean(address && calls.length),
    },
  );
  const network = passPhraseToNetworkDetail(networkPassphrase).network;
  const tokens = useMemo(() => {
    const userTokens: ITokenDetails[] = [];

    contracts.forEach((contract, index) => {
      const balance = tokenDetails?.values[index * 3];
      const symbol = tokenDetails?.values[index * 3 + 1];
      const decimals = tokenDetails?.values[index * 3 + 2];

      if (balance == null || !new BN(balance.toString()).isGreaterThanOrEqualTo(1)) {
        return;
      }

      userTokens.push({
        address: contract,
        balance: balance.toString(),
        symbol: symbol === 'native' ? 'XLM' : String(symbol),
        decimals: String(decimals),
        name: '',
        logo: '',
        _id: '',
        claimable: false,
        network,
      });
    });

    const networkTokens = tokensFromStore.filter((token) => token.network === network);

    return Array.from(
      new Map([...networkTokens, ...userTokens].map((token) => [token.address, token])).values(),
    );
  }, [contracts, network, tokenDetails, tokensFromStore]);

  return {
    tokens,
  };
};

export default useFetchTokenDetails;
