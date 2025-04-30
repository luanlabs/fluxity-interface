import { useEffect } from 'react';

import { clearToken, loadTokens } from 'src/reducers/tokens';
import { getTokenList } from 'src/features/getTokenList';
import { useAppDispatch, useAppSelector } from './useRedux';
import getTokenBalances from 'src/features/getTokenBalances';

const useLoadTokens = (network: string, passPhrase: string) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.user.address);
  const tokens = useAppSelector((state) => state.tokens);

  useEffect(() => {
    if (!tokens.length) {
      getTokenList(network).then(async (data) => {
        const mappedTokens = data.data.result.map((token) => {
          return { ...token, balance: '0' };
        });

        dispatch(clearToken());

        dispatch(loadTokens(mappedTokens));

        if (mappedTokens.length > 0) {
          getTokenBalances(address, passPhrase, mappedTokens)
            .then((updatedTokens) => {
              dispatch(loadTokens(updatedTokens));
            })
            .catch((_) => {});
        }
      });
    }
  }, [dispatch, network, address, tokens]);
};

export default useLoadTokens;
