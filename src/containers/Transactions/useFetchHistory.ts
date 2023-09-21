import { useEffect, useState } from 'react';
import { StreamStatus } from 'src/components/CStreamStatus';

interface IStreamHistory {
  id: number | string;
  streamType: 'receive' | 'send';
  address: string;
  completionPercentage: number | string;
  streamStatus: StreamStatus;
  token: string;
  amount: number;
}

interface IStream {
  model: 'linear' | 'exponential';
  amountPerSecond: number;
  token: string;
  from: string;
  to: string;
  streamId: number;
  startDate: Date;
  endDate: Date;
  cliffDate: Date;
  isCancellable: boolean;
}

const mockStreams: IStream[] = [
  {
    model: 'linear',
    amountPerSecond: 10,
    token: 'USDT',
    from: '0x123456789',
    to: '0x987654321',
    streamId: 1,
    startDate: new Date('2023-09-01T00:00:00Z'),
    endDate: new Date('2023-09-10T00:00:00Z'),
    cliffDate: new Date('2023-09-05T00:00:00Z'),
    isCancellable: true,
  },
  {
    model: 'exponential',
    amountPerSecond: 5,
    token: 'ETH',
    from: '0xabcdef123',
    to: '0x456789abc',
    streamId: 2,
    startDate: new Date('2023-09-05T00:00:00Z'),
    endDate: new Date('2023-09-15T00:00:00Z'),
    cliffDate: new Date('2023-09-08T00:00:00Z'),
    isCancellable: false,
  },
  {
    model: 'linear',
    amountPerSecond: 8,
    token: 'BTC',
    from: '0x567890abc',
    to: '0xdef123456',
    streamId: 3,
    startDate: new Date('2023-09-10T00:00:00Z'),
    endDate: new Date('2023-09-20T00:00:00Z'),
    cliffDate: new Date('2023-09-12T00:00:00Z'),
    isCancellable: true,
  },
  {
    model: 'exponential',
    amountPerSecond: 12,
    token: 'XRP',
    from: '0x7890cdef1',
    to: '0x234567890',
    streamId: 4,
    startDate: new Date('2023-09-15T00:00:00Z'), // ONGOING
    endDate: new Date('2023-09-25T00:00:00Z'),
    cliffDate: new Date('2023-09-18T00:00:00Z'),
    isCancellable: false,
  },
  {
    model: 'linear',
    amountPerSecond: 15,
    token: 'ADA',
    from: '0x111111111',
    to: '0x222222222',
    streamId: 5,
    startDate: new Date('2023-09-30T00:00:00Z'), // PENDING
    endDate: new Date('2023-10-10T00:00:00Z'),
    cliffDate: new Date('2023-10-03T00:00:00Z'),
    isCancellable: true,
  },
];

const fetchStreams = async (address: string): Promise<IStream[]> => {
  return mockStreams;
};
const currentDate = new Date();

function calculateCompletionPercentage(stream: IStream) {
  const { startDate, endDate } = stream;
  const currentDate = new Date().getTime();

  if (currentDate < startDate.getTime()) {
    return 0;
  }

  if (currentDate >= endDate.getTime()) {
    return 100;
  }

  const elapsedMilliseconds = currentDate - startDate.getTime();

  const totalMilliseconds = endDate.getTime() - startDate.getTime();

  const completionPercentage = (elapsedMilliseconds / totalMilliseconds) * 100;

  return completionPercentage.toFixed();
}

function streamStatusHandler(stream: IStream) {
  if (currentDate < stream.startDate) {
    return StreamStatus.PENDING;
  } else if (currentDate < stream.endDate) {
    return StreamStatus.ONGOING;
  }
  return StreamStatus.EXPIRED;
}

const useFetchHistory = (address: string): IStreamHistory[] => {
  const [streamList, setStreamList] = useState<IStreamHistory[]>([]);

  useEffect(() => {
    fetchStreams(address).then((streams) => {
      const streamHistories: IStreamHistory[] = streams.map((stream) => {
        const completionPercentage = calculateCompletionPercentage(stream);
        const streamStatus = streamStatusHandler(stream);

        return {
          id: stream.streamId,
          streamType: address === stream.from ? 'send' : 'receive',
          address: address === stream.from ? stream.to : stream.from,
          completionPercentage,
          streamStatus,
          token: stream.token,
          amount:
            (stream.endDate.getTime() - stream.startDate.getTime()) *
            stream.amountPerSecond,
        };
      });

      setStreamList(streamHistories);
    });
  }, [address]);

  return streamList;
};

export default useFetchHistory;
