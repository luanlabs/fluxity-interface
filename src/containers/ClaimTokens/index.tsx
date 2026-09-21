import Image from 'next/image';
import React from 'react';

import CCard from 'src/components/CCard';
import blueDivider from 'public/images/blueDivider.svg';

const ClaimTokens = () => {
  return (
    <CCard
      borderColor="#0000001A"
      className="relative bg-white p-[19.6px] short:h-[215px] h-[238px] mobile:h-[208px] w-1/2 mobile:w-full"
    >
      <h1 className="font-medium text-2xl mobile:text-lg">Get USDC for testing</h1>

      <Image src={blueDivider} alt="" className="py-4 select-none" />

      <ol className="space-y-2 text-sm text-midnightBlue">
        <li className="flex items-start gap-2">
          <span className="font-medium text-royalBlue" aria-hidden="true">
            1.
          </span>
          <span>Switch to Testnet above.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium text-royalBlue" aria-hidden="true">
            2.
          </span>
          <span>
            In the bottom-right wallet menu, choose <strong>Show Profile</strong>, then{' '}
            <strong>Swap</strong>.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium text-royalBlue" aria-hidden="true">
            3.
          </span>
          <span>Select USDC and complete the swap.</span>
        </li>
      </ol>
    </CCard>
  );
};

export default ClaimTokens;
