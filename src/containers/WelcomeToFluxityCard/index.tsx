import React from 'react';
import Image from 'next/image';

import welcomeLogo from 'public/images/welcome.svg';

import CCard from 'src/components/CCard';

const WelcomeToFluxityCard = () => {
  return (
    <div className="w-full h-[267px]">
      <CCard
        className="flex justify-between w-full h-full"
        bgColor="#EBFDFF"
        borderColor="#9af3ff"
      >
        <div className="p-[53px]">
          <h1 className="text-[30px] w-[32%] text-midnightBlue">
            Welcome to Fluxity!
          </h1>
          <p className="ext-[15px] w-[80%] mt-[23px] text-midnightBlue">
            Your command center to create, monitor, and manage your token
            streams.
          </p>
        </div>
        <div>
          <Image
            src={welcomeLogo}
            width={275}
            height={275}
            className="mr-10"
            alt="logo"
          />
        </div>
      </CCard>
    </div>
  );
};

export default WelcomeToFluxityCard;
