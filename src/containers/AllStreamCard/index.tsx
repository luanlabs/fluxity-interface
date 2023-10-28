'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import { Pages } from 'src/constants/pages';
import CButton from 'src/components/CButton';

import close from 'public/images/close.svg';
import helpLogo from 'public/images/help.svg';
import cardLogo from 'public/images/cardLogo.svg';

const AllStreamCard = () => {
  const [isClosed, setIsClosed] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.push(Pages.FAQ);
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    <div className="w-full">
      <CCard
        className={`relative ${
          isClosed ? 'hidden' : 'flex'
        } justify-between w-full h-full transition-all duration-700 mb-5`}
        bgColor="#EBFDFF"
        borderColor="#3A21D433"
      >
        <Image
          src={close}
          alt="close"
          onClick={handleClose}
          className="absolute top-[18px] right-[21px] cursor-pointer"
        />
        <div className="pl-[38px] pt-4 text-royalBlue">
          <h1 className="text-[28px] w-full">All stream are Here!</h1>
          <p className="text-[15px] w-2/3 mt-[10px] mb-5">
            Keep all your present, future, and past streams under your touch.
            Enjoy secure, efficient, and user-friendly experience of token
            streaming.
          </p>
          <div className="pb-7">
            <CButton
              onClick={handleClick}
              variant="simple"
              color="blueWhite"
              content="FAQ"
              logo={helpLogo}
            />
          </div>
        </div>
        <Image src={cardLogo} alt="logo" />
      </CCard>
    </div>
  );
};

export default AllStreamCard;
