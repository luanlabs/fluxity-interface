import React, { useEffect } from 'react';

import { loadTokens } from 'src/reducers/tokens';
import { getTokenList } from 'src/features/getTokenList';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { loadStreamHistory } from 'src/reducers/user';
import getTokenBalances from 'src/features/getTokenBalances';
import getStreamList from 'src/features/getStreamList';
import { IStreamHistory } from 'src/constants/types';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';
import { formatUnits } from 'src/utils/formatUnits';

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
    if (address) {
      const fetchStreams = () => {
        getStreamList(address).then((data) => {
          const streamHistories: IStreamHistory[] = data.map((stream) => {
            const completionPercentage = calculateCompletionPercentage(
              stream.start_date,
              stream.end_date,
            );
            const streamAmount = formatUnits(stream.amount, 7);
            return {
              ...stream,
              streamAmount,
              completionPercentage,
              isSender: address === stream.sender,
            };
          });
          dispatch(loadStreamHistory(streamHistories));
        });
      };

      fetchStreams();

      const intervalId = setInterval(fetchStreams, 5000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, address]);

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
