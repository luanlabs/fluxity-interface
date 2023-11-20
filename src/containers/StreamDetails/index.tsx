'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import CPageCard from 'src/components/CPageCard';
import CStreamStatusButton from 'src/components/CStreamStatusButton';
import { useAppSelector } from 'src/hooks/useRedux';

import { streamData } from './mockData';
import SummaryFields from './SummaryFields';
import BlueCard from './BlueCard';
import SenderStatusCard from './SenderStatusCard';
import ReceiverStatusCard from './ReceiverStatusCard';

import receiveLogo from '/public/images/receive.svg';

const StreamDetails = () => {
  const address = useAppSelector((state) => state.user.address);

  const isSender = address === streamData.sender;
  const isReceiver = address === streamData.receiver;

  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #100065</h1>
      <CStreamStatusButton type={streamData.status} />
    </div>
  );

  return (
    <div className="w-full flex gap-4">
      <CPageCard
        divider
        title={mainTitle}
        className="w-full px-6 py-[15px]"
        childrenClassName="!pl-0"
      >
        <section className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6 mt-8">
            <Image src={receiveLogo} alt="receiveLogo" height={0} width={0} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[40px]">+523.348 USDC</h2>
            <p className="text-base">Total amount streamed</p>
          </div>

          <BlueCard sender={streamData.sender} flowRate={streamData.rate.toString()} />
        </section>
      </CPageCard>

      <div>
        <SummaryFields />
        {isSender && <SenderStatusCard />}
        {isReceiver && <ReceiverStatusCard />}
      </div>
    </div>
  );
};

export default StreamDetails;
