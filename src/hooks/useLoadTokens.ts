import { useEffect } from 'react';
import { useReadContracts } from '@bluxcc/react';

import { clearToken, loadTokens } from 'src/reducers/tokens';
import { getTokenList } from 'src/features/getTokenList';
import { useAppDispatch, useAppSelector } from './useRedux';

const useLoadTokens = (network: string, networkPassphrase: string, address: string) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens);
  const balanceCalls = tokens.map((token) => ({
    address: token.address,
    fn: 'balance',
    args: [address],
  }));
  const { data: tokenBalances } = useReadContracts<readonly string[]>(
    balanceCalls,
    { network: networkPassphrase },
    {
      enabled: Boolean(address && balanceCalls.length),
      refetchInterval: 25_000,
    },
  );

  useEffect(() => {
    getTokenList(network).then((data) => {
      const mappedTokens = data.data.result.map((token) => {
        return { ...token, balance: '0' };
      });

      dispatch(clearToken());
      dispatch(loadTokens(mappedTokens));
    });
  }, [dispatch, network]);

  useEffect(() => {
    if (!tokenBalances || tokenBalances.values.length !== tokens.length) {
      return;
    }

    const updatedTokens = tokens.map((token, index) => ({
      ...token,
      balance: tokenBalances.values[index]?.toString() ?? '0',
    }));
    const balancesChanged = updatedTokens.some(
      (token, index) => token.balance !== tokens[index].balance,
    );

    if (balancesChanged) {
      dispatch(loadTokens(updatedTokens));
    }
  }, [dispatch, tokenBalances, tokens]);
};

export default useLoadTokens;
