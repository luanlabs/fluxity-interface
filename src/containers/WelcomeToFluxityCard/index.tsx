import React from 'react';
import Image from 'next/image';

import welcomeLogo from 'public/images/welcome.svg';
import halfWelcomeLogo from 'public/images/halfWelcome.svg';

import CCard from 'src/components/CCard';

const WelcomeToFluxityCard = () => {
  return (
    <div className="w-full h-[267px]">
      <CCard
        className="relative flex justify-between w-full h-full"
        bgColor="#EBFDFF"
        borderColor="#9af3ff"
      >
        <div className="w-full p-[53px] mobile:p-0 mobile:flex mobile:flex-col mobile:justify-center mobile:items-start mobile:pl-6 text-midnightBlue z-20">
          <h1 className="text-[30px] w-[32%] mobile:w-[200px] font-medium">Welcome to Fluxity!</h1>
          <p className="text-[14px] w-1/3 mt-[23px] mobile:mt-3 mobile:w-[55%]">
            Your command center to create, monitor, and manage your token streams.
          </p>
        </div>
        <div className="z-10">
          <Image
            src={welcomeLogo}
            fill
            alt="logo"
            className="object-contain object-right mobile:hidden"
            draggable={false}
          />
          <Image
            src={halfWelcomeLogo}
            fill
            alt="logo"
            className="object-contain object-right desktop:hidden"
            draggable={false}
          />
        </div>
      </CCard>
    </div>
  );
};

export default WelcomeToFluxityCard;
