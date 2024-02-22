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
    <div className="w-full mobile:hidden desktop:block">
      <CCard
        className={`relative h-[201px] mb-5 justify-between w-full ${
          isClosed ? 'hidden' : 'flex'
        } transition-all duration-700 mb-5`}
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
          <h1 className="text-[28px] w-full font-medium">All stream are Here!</h1>
          <p className="text-[15px] mt-[10px] mb-5">
            Keep all your present, future, and past streams under your touch. Enjoy secure,
            efficient, and user-friendly experience of token streaming.
          </p>
          <div className="pb-7">
            <CButton
              onClick={handleClick}
              variant="simple"
              color="blueWhite"
              content="FAQ"
              logo={helpLogo}
              className="hover:bg-[#F0EFFF] transition-colors duration-700"
            />
          </div>
        </div>
        <Image src={cardLogo} alt="logo" width={650} />
      </CCard>
    </div>
  );
};

export default AllStreamCard;
