import React from 'react';
import Image from 'next/image';

import VectorSvg from '../../../public/images/vector.svg';

import CCard from '../../components/CCard';

const WelcomeToFluxity = () => {
  return (
    <CCard
      className="flex justify-between w-[985px] h-[267px]"
      bgColor="#EBFDFF"
      borderColor="#9af3ff"
    >
      <div className="p-[53px]">
        <h1 className="text-[30px] w-[32%]">Welcome to Fluxity!</h1>
        <p className="ext-[15px] w-[80%] mt-[23px] text-[#050142]">
          Your command center to create, monitor, and manage your token streams.
        </p>
      </div>
      <div>
        <Image src={VectorSvg} width={275} height={275} className="mr-10" alt="logo" />
      </div>
    </CCard>
  );
};

export default WelcomeToFluxity;
