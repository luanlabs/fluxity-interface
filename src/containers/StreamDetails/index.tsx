/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CStreamStatusButton from 'src/components/CStreamStatusButton';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import useGetStreamById from 'src/utils/getStreamById';
import decimalToNumber from 'src/utils/decimalToNumber';

import SummaryFields from './SummaryFields';
import BlueCard from './BlueCard';
import SenderStatusCard from './SenderStatusCard';
import ReceiverStatusCard from './ReceiverStatusCard';
import Amount from './Amount';

import receiveLogo from 'public/images/receive.svg';
import sendLogo from 'public/images/send.svg';
import Loading from './Loading';

interface StreamDetailsProps {
  id: string;
}

const StreamDetails = ({ id }: StreamDetailsProps) => {
  const router = useRouter();

  const address = useAppSelector((state) => state.user.address);

  const { loading, data, error } = useGetStreamById(id);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <p>error</p>;
  }

  const amount = decimalToNumber(data.amount, data.token.decimals);
  const withdraw = decimalToNumber(data.withdrawn, data.token.decimals);

  const isSender = address === data.sender;
  const isReceiver = address === data.receiver;

  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #{data._id}</h1>
      <CStreamStatusButton type={data.status} />
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
            {(isSender || isReceiver) && (
              <Image
                src={isSender ? sendLogo : receiveLogo}
                alt="receiveLogo"
                height={0}
                width={0}
              />
            )}
          </div>

          <Amount {...data} />

          <BlueCard
            sender={data.sender}
            flowRate={data.rate.toString()}
            startDate={data.start_date}
            endDate={data.end_date}
          />
        </section>
      </CPageCard>

      <div>
        {data && <SummaryFields {...data} />}
        {isSender && <SenderStatusCard amount={amount} />}
        {isReceiver && <ReceiverStatusCard amount={amount} withdrawn={withdraw} />}
      </div>
    </div>
  );
};

export default StreamDetails;
