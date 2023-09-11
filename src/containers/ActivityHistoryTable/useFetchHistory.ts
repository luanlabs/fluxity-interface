interface IStreamHistory {
  streamType: 'receive' | 'send';
  address: string;
  completionPercentage: number;
  isActive: boolean;
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
    token: 'ABC123',
    from: 'UserA',
    to: 'UserB',
    streamId: 1,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-02-01'),
    cliffDate: new Date('2023-01-15'),
    isCancellable: true,
  },
  {
    model: 'exponential',
    amountPerSecond: 5,
    token: 'XYZ789',
    from: 'UserC',
    to: 'UserD',
    streamId: 2,
    startDate: new Date('2023-02-15'),
    endDate: new Date('2023-03-15'),
    cliffDate: new Date('2023-02-28'),
    isCancellable: false,
  },
  {
    model: 'linear',
    amountPerSecond: 15,
    token: 'DEF456',
    from: 'UserE',
    to: 'UserF',
    streamId: 3,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-04-01'),
    cliffDate: new Date('2023-03-15'),
    isCancellable: true,
  },
];

const currentDate = new Date();

const fetchStreams = async (address: string): Promise<IStream[]> => {
  return mockStreams;
};

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

  return completionPercentage;
}

const useFetchHistory = async (address: string) => {
  const streams = await fetchStreams(address);
  const streamHistories: IStreamHistory[] = streams.map((stream) => ({
    streamType: address === stream.from ? 'send' : 'receive',
    address: address === stream.from ? stream.to : stream.from,
    completionPercentage: calculateCompletionPercentage(stream),
    isActive:
      currentDate < stream.endDate && currentDate > stream.startDate
        ? true
        : false,
    token: stream.token,
    amount:
      (stream.endDate.getTime() - stream.startDate.getTime()) *
      stream.amountPerSecond,
  }));
  return streams;
};

export default useFetchHistory;
