import { useEffect, useState } from 'react';
import qs from 'qs';

import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseStreamsResult, IStreamHistory } from 'src/constants/types';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';
import { formatUnits } from 'src/utils/formatUnits';

const fetchStreams = async (address: string) => {
  if (!address) {
    return [];
  }
  const qsAddress = qs.stringify({ address });
  try {
    const streams = await fetch<IResponseStreamsResult>(
      `${ExternalPages.FLUXITY_API}/testnet/stream?${qsAddress}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      },
    );

    return streams.data.result;
  } catch (e) {}
  return [];
};

const useFetchHistory = (address: string): IStreamHistory[] => {
  const [streamList, setStreamList] = useState<IStreamHistory[]>([]);

  useEffect(() => {
    const fetchStreamsFunction = () => {
      fetchStreams(address).then((streams) => {
        const streamHistories: IStreamHistory[] = streams.map((stream) => {
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

        setStreamList(streamHistories);
      });
    };
    const intervalId = setInterval(() => {
      fetchStreamsFunction();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [address]);

  return streamList;
};

export default useFetchHistory;
