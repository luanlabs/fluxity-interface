import { useEffect, useState } from 'react';
import qs from 'qs';

import BN from 'src/utils/BN';
import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseStreamsResult, IStreamHistory } from 'src/constants/types';

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

const calculateCompletionPercentage = (start_date: number, end_date: number) => {
  const currentDate = Date.now();
  const endDate = new Date(end_date).getTime() * 1000;
  const startDate = new Date(start_date).getTime() * 1000;

  if (currentDate < startDate) {
    return 0;
  }

  if (currentDate >= endDate) {
    return 100;
  }

  const elapsedTime = new BN(currentDate).minus(startDate);

  const totalTime = new BN(endDate).minus(startDate);

  const completionPercentage = new BN(elapsedTime).div(totalTime).times(100);

  return completionPercentage.toFixed(0);
};

const calculateAmount = (amount: string) => {
  const number = new BN(amount).div(10 ** 7).toFixed(5);
  return number;
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
          const streamAmount = calculateAmount(stream.amount);
          return {
            ...stream,
            streamAmount,
            completionPercentage,
            type: address === stream.receiver ? 'receive' : 'send',
          };
        });

        setStreamList(streamHistories);
      });
    };
    fetchStreamsFunction();
    const intervalId = setInterval(fetchStreams, 5000);

    return () => clearInterval(intervalId);
  }, [address]);

  return streamList;
};

export default useFetchHistory;
