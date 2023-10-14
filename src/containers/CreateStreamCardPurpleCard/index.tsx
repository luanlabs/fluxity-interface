import React from 'react';

import CCard from '../../components/CCard';
import CButton from '../../components/CButton';
import fluxityLogo from '../../../public/images/fluxity.svg';

const CreateStreamCardPurpleCard = () => {
  return (
    <div className="w-1/2">
      <CCard
        className="flex flex-col px-[21px] py-[13px] w-full h-full"
        bgColor="#f5ebff"
        borderColor="#BE7CFF"
      >
        <h1 className="text-[22px] mb-[25px] w-[32%] whitespace-nowrap text-richlavender">
          Create Stream
        </h1>
        <p className="text-[16px] w-[70%] mb-[30px] text-midnightblue leading-[20px]">
          Initiate token streams effortlessly; streams tailored to respond to
          your needs.
        </p>
        <div className="flex items-center gap-4 mt-[20px] pb-2">
          <CButton
            kind="simple"
            color="purple"
            content="Create Stream"
            logo={fluxityLogo}
          />
          <a href="#" className="text-[14px]">
            Learn more
          </a>
        </div>
      </CCard>
    </div>
  );
};

export default CreateStreamCardPurpleCard;
