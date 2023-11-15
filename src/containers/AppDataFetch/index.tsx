import React, { useEffect } from 'react';

import { loadTokens } from 'src/reducers/tokens';
import { getTokenList } from 'src/features/getTokenList';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import getTokenBalances from 'src/features/getTokenBalances';

const AppDataFetch = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.user.address);
  const tokens = useAppSelector((state) => state.tokens);

  useEffect(() => {
    if (!tokens.length) {
      getTokenList().then((data) => {
        const mappedTokens = data.data.result.map((token) => {
          return { ...token, balance: '0' };
        });

        dispatch(loadTokens(mappedTokens));
      });
    }
  }, [dispatch, tokens.length]);

  useEffect(() => {
    const fetchTokenBalances = () => {
      if (address) {
        getTokenBalances(address, tokens)
          .then((updatedTokens) => {
            dispatch(loadTokens(updatedTokens));
          })
          .catch((_) => {});
      }
    };

    const intervalId = setInterval(fetchTokenBalances, 25000);

    return () => clearInterval(intervalId);
  }, [address, dispatch, tokens]);

  return <></>;
};

export default AppDataFetch;
