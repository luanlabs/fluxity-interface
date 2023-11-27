/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import CStreamStatusButton from 'src/components/CStreamStatusButton';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import useFetchData from 'src/utils/getStreamData';
import decimalToNumber from 'src/utils/decimalToNumber';

import SummaryFields from './SummaryFields';
import BlueCard from './BlueCard';
import SenderStatusCard from './SenderStatusCard';
import ReceiverStatusCard from './ReceiverStatusCard';
import Amount from './Amount';

import receiveLogo from 'public/images/receive.svg';
import sendLogo from 'public/images/send.svg';

const handleGetStream = (id: string) => {
  return useFetchData(id);
};

const StreamDetails = () => {
  const address = useAppSelector((state) => state.user.address);
  const pathname = usePathname();

  const id = pathname.split('/')[2];
  const streamData = handleGetStream(id);

  if (!streamData) {
    return;
  }

  const amount = decimalToNumber(streamData.amount, streamData.token.decimals);
  const withdraw = decimalToNumber(streamData.withdrawn, streamData.token.decimals);

  const isSender = address === streamData.sender;
  const isReceiver = address === streamData.receiver;

  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #{streamData._id}</h1>
      <CStreamStatusButton type={streamData.status} />
    </div>
  );

  return (
    <div className="w-full flex gap-4 h-[86vh] 2xl:h-[69vh] 3xl:h-[43vh] 4xl:h-[26vh]">
      <CPageCard
        divider
        title={mainTitle}
        className="w-full px-6 py-[15px] h-full"
        childrenClassName="!pl-0"
      >
        <section className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6 mt-8">
            {isSender && isReceiver && (
              <Image
                src={isSender ? sendLogo : receiveLogo}
                alt="receiveLogo"
                height={0}
                width={0}
              />
            )}
          </div>

          <Amount {...streamData} />

          <BlueCard
            sender={streamData.sender}
            flowRate={streamData.rate.toString()}
            startDate={streamData.start_date}
            endDate={streamData.end_date}
          />
        </section>
      </CPageCard>

      <div>
        {streamData && <SummaryFields {...streamData} />}
        {isSender && <SenderStatusCard amount={amount} />}
        {isReceiver && <ReceiverStatusCard amount={amount} withdrawn={withdraw} />}
      </div>
    </div>
  );
};

export default StreamDetails;
