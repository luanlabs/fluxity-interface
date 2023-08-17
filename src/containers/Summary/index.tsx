import React from 'react';
import Image from 'next/image';

import CCard from '../../components/CCard';
import SummarySvg from '../../../public/images/summary.svg';

const Summary = () => {
  return (
    <div className="w-[329px]">
      <CCard
        className="flex flex-col justify-between w-full px-3 py-4"
        bgColor="#fff"
        borderColor="rgba(5, 1, 66, 0.10)"
      >
        <div className="w-full flex justify-between items-center pb-4">
          <h1 className="text-[18px] text-midnightblue">Summary</h1>
          <Image src={SummarySvg} alt="summary" />
        </div>
      </CCard>
    </div>
  );
};

export default Summary;
