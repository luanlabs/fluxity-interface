import { useEffect } from 'react';

import { useAppDispatch } from './useRedux';
import formatUnits from 'src/utils/formatUnits';
import { IStreamHistory } from 'src/constants/types';
import getStreamList from 'src/features/getStreamList';
import { loadStreamHistory } from 'src/reducers/user';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';

const useLoadStreams = (address: string, network: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) {
      const fetchStreams = () => {
        getStreamList(address, network).then((data) => {
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
  }, [dispatch, address, network]);
};

export default useLoadStreams;
