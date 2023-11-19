'use client';
import Image from 'next/image';

import CPageCard from 'src/components/CPageCard';
import CStreamDetailsStatus from 'src/components/CStreamDetailsStatus';

import { streamData } from './mockData';
import StatusCard from './StatusCard';
import SummaryFields from './SummaryFields';
import BlueCard from './BlueCard';

import receiveLogo from '/public/images/receive.svg';

const StreamDetails = () => {
  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #100065</h1>
      <CStreamDetailsStatus type={streamData.status} label={streamData.status} />
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
        <StatusCard />
      </div>
    </div>
  );
};

export default StreamDetails;
