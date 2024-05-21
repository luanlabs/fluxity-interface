import { useEffect, useState } from 'react';
import { HorizonApi } from '@stellar/stellar-sdk/lib/horizon';

import checkBalanceTokenSoroban from 'src/features/checkBalanceTokenSoroban';
import { useAppSelector } from 'src/hooks/useRedux';
import { ITokenDetails } from 'src/models';
import { IToken } from 'src/reducers/tokens';
import BN from 'src/utils/BN';

const useFetchTokenDetails = (address: string, networkPassphrase: string) => {
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [userTokens, setUserTokens] = useState<ITokenDetails[]>([]);

  const userBalances = useAppSelector((state) => state.user?.info?.balances);
  const tokensFromStore = useAppSelector((store) => store.tokens);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const result = await checkBalanceTokenSoroban(
          address,
          userBalances as HorizonApi.BalanceLineAsset<'credit_alphanum4' | 'credit_alphanum12'>[],
          networkPassphrase,
        );

        const filteredTokenBalance = result.filter((e) =>
          new BN(e.balance).isGreaterThanOrEqualTo(1),
        );

        setUserTokens(filteredTokenBalance);
      } catch {}
    };

    const filterClaimableTokens = tokensFromStore.filter((token) => token.claimable);

    fetchTokenDetails();

    setTokens([...filterClaimableTokens, ...userTokens]);
  }, [address, tokensFromStore]);

  return {
    tokens,
  };
};

export default useFetchTokenDetails;
