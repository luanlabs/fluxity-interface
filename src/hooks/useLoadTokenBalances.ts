import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';
import { loadTokens } from 'src/reducers/tokens';
import getTokenBalances from 'src/features/getTokenBalances';

const useLoadTokenBalances = (address: string, passPhrase: string) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens);

  useEffect(() => {
    const fetchTokenBalances = () => {
      if (address) {
        getTokenBalances(address, passPhrase, tokens)
          .then((updatedTokens) => {
            dispatch(loadTokens(updatedTokens));
          })
          .catch((_) => {});
      }
    };

    const intervalId = setInterval(fetchTokenBalances, 25000);

    return () => clearInterval(intervalId);
  }, [address, dispatch, passPhrase]);
};

export default useLoadTokenBalances;
