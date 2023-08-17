import React from 'react';
import Image from 'next/image';

import CardSvg from '../../../public/images/card.svg';
import HelpSvg from '../../../public/images/help.svg';

import CCard from '../../components/CCard';
import CButton from '../../components/CButton';

const AllStream = () => {
  return (
    <div className="w-[996px] h-[201px]">
      <CCard
        className="flex justify-between w-full h-full"
        bgColor="#EBFDFF"
        borderColor="rgba(58, 33, 212, 0.2)"
      >
        <div className="pl-[38px] pt-[29px] text-[#3A21D4] ">
          <h1 className="text-[28px] w-full">All stream are Here!</h1>
          <p className="text-[15px] w-[90%] mt-[10px] mb-[20px]">
            Keep all your present, future, and past streams under your touch. Enjoy
            secure, efficient, and user-friendly experience of token streaming.
          </p>
          <CButton kind="simple" color="blueWhite" content="Get Help" logo={HelpSvg} />
        </div>
        <div className="h-full">
          <Image src={CardSvg} width="540" alt="logo" />
        </div>
      </CCard>
    </div>
  );
};

export default AllStream;
