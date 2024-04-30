import { useEffect } from 'react';

import { loadTokens } from 'src/reducers/tokens';
import { getTokenList } from 'src/features/getTokenList';
import { useAppDispatch, useAppSelector } from './useRedux';

const useLoadTokens = () => {
  const dispatch = useAppDispatch();
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
};

export default useLoadTokens;
