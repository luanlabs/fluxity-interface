import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import { Pages } from 'src/constants/pages';
import CButton from 'src/components/CButton';

import cardLogo from 'public/images/card.svg';
import helpLogo from 'public/images/help.svg';

const AllStreamCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(Pages.FAQ);
  };

  return (
    <div className="w-full relative">
      <CCard
        className="flex justify-between w-full h-full"
        bgColor="#EBFDFF"
        borderColor="rgba(58, 33, 212, 0.2)"
      >
        <div className="pl-[38px] pt-[29px] text-royalBlue">
          <h1 className="text-[28px] w-full">All stream are Here!</h1>
          <p className="text-[15px] w-[90%] mt-[10px] mb-5">
            Keep all your present, future, and past streams under your touch.
            Enjoy secure, efficient, and user-friendly experience of token
            streaming.
          </p>
          <div className="pb-7">
            <CButton
              onClick={handleClick}
              variant="simple"
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
