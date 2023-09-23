import React from 'react';
import Image from 'next/image';

import cardLogo from '../../../public/images/card.svg';
import helpLogo from '../../../public/images/help.svg';
import CCard from '../../components/CCard';
import CButton from '../../components/CButton';

const AllStreamCard = () => {
  return (
    <div className="w-full relative">
      <CCard
        className="flex justify-between w-full h-full"
        bgColor="#EBFDFF"
        borderColor="rgba(58, 33, 212, 0.2)"
      >
        <div className="pl-[38px] pt-[29px] text-royalblue">
          <h1 className="text-[28px] w-full">All stream are Here!</h1>
          <p className="text-[15px] w-[90%] mt-[10px] mb-[20px]">
            Keep all your present, future, and past streams under your touch.
            Enjoy secure, efficient, and user-friendly experience of token
            streaming.
          </p>
          <div className="pb-7">
            <CButton
              kind="simple"
              color="blueWhite"
              content="Get Help"
              logo={helpLogo}
            />
          </div>
        </div>
        <div className="h-full pb-4 w-[50%]">
          <Image
            src={cardLogo}
            width={343}
            height={343}
            alt="logo"
            className="absolute bottom-0 right-0"
          />
        </div>
      </CCard>
    </div>
  );
};

export default AllStreamCard;
