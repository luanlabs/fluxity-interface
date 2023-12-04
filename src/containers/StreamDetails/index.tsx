/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import CStreamStatusButton from 'src/components/CStreamStatusButton';
import CPageCard from 'src/components/CPageCard';
import useGetStreamById from 'src/utils/getStreamById';
import { useAppSelector } from 'src/hooks/useRedux';
import formatUnits from 'src/utils/formatUnits';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';

import SummaryFields from './SummaryFields';
import BlueCard from './BlueCard';
import SenderStatusCard from './SenderStatusCard';
import ReceiverStatusCard from './ReceiverStatusCard';
import DynamicStreamedAmount from './DynamicStreamedAmount';
import Loading from './Loading';

import receiveLogo from 'public/images/receive.svg';
import sendLogo from 'public/images/send.svg';

interface StreamDetailsProps {
  id: string;
}

const StreamDetails = ({ id }: StreamDetailsProps) => {
  const address = useAppSelector((state) => state.user.address);
  const { loading, data, error } = useGetStreamById(id);
  const [sendStreamAmount, setSendStreamAmount] = useState(
    calculateStreamAmounts(0, 0, 0, '0').receiverAmount,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (data) {
        setSendStreamAmount(
          calculateStreamAmounts(
            data.start_date,
            data.end_date,
            data.cliff_date,
            formatUnits(data.amount, data.token.decimals),
          ).receiverAmount,
        );
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <p>error</p>;
  }

  const amount = formatUnits(data.amount, data.token.decimals);
  const withdraw = formatUnits(data.withdrawn, data.token.decimals);

  const isSender = address === data.sender;
  const isReceiver = address === data.receiver;

  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #{data.id}</h1>
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

          <DynamicStreamedAmount
            token={data.token.symbol}
            streamAmount={sendStreamAmount.toFixed(3)}
          />

          <BlueCard
            sender={data.sender}
            flowRate={data.rate}
            startDate={data.start_date}
            endDate={data.end_date}
            amount={formatUnits(data.amount, data.token.decimals)}
            token={data.token.symbol}
          />
        </section>
      </CPageCard>

      <div>
        {data && <SummaryFields {...data} />}

        {isSender && (
          <SenderStatusCard
            amount={amount}
            startDate={data.start_date}
            endDate={data.end_date}
            cliffDate={data.cliff_date}
            isCancellable={data.is_cancelled}
          />
        )}

        {isReceiver && (
          <ReceiverStatusCard
            startDate={data.start_date}
            endDate={data.end_date}
            cliffDate={data.cliff_date}
            amount={amount}
            withdrawn={withdraw}
          />
        )}
      </div>
    </div>
  );
};

export default StreamDetails;
