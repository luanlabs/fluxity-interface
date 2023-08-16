import React from 'react';

import LogoSvg from '../../../public/images/fluxity.svg';

import CCard from '../../components/CCard';
import CButton from '../../components/CButton';

const CreateStreamPurple = () => {
  return (
    <CCard
      className="flex flex-col px-[21px] py-[13px] w-[480px] h-[230px]"
      bgColor="#F5EBFF"
      borderColor="#BE7CFF"
    >
      <h1 className="text-[22px] mb-[25px] w-[32%] text-[#852FDA]">Create Stream</h1>
      <p className="text-[16px] w-[60%] mb-[30px] text-[#050142] leading-[20px]">
        Initiate token streams effortlessly; streams tailored to respond to your needs.
      </p>
      <div className=" flex items-center gap-4">
        <CButton kind="simple" color="purple" content="Create Stream" logo={LogoSvg} />
        <a href="#" className="text-[14px]">
          Learn more
        </a>
      </div>
    </CCard>
  );
};

export default CreateStreamPurple;
