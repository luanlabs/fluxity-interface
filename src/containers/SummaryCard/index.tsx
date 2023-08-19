import React from 'react';
import Image from 'next/image';

import CPageCard from '../../components/CPageCard';
import summaryLogo from '../../../public/images/summary.svg';

const SummaryCard = () => {
  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-[18px] text-midnightblue">Summary</h1>
      <Image src={summaryLogo} alt="summary" width={15} height={15} />
    </div>
  );

  return (
    <div className="w-[329px]">
      <CPageCard title={summaryTitle} className="px-3 py-4">
        Lists
      </CPageCard>
    </div>
  );
};

export default SummaryCard;
