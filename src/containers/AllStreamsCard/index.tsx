'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppSelector } from 'src/hooks/useRedux';

import CCard from 'src/components/CCard';
import { Pages } from 'src/constants/pages';
import CButton from 'src/components/CButton';

import close from 'public/images/close.svg';
import helpLogo from 'public/images/help.svg';
import cardLogo from 'public/images/cardLogo.svg';

const AllStreamsCard = () => {
  const [isClosed, setIsClosed] = useState(false);
  const router = useRouter();

  const history = useAppSelector((state) => state.user.history);

  useEffect(() => {
    if (history.length > 4) {
      setIsClosed(true);
    }
  }, [history, isClosed, setIsClosed]);

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
        <div className="pl-8 pt-4 text-royalBlue">
          <h1 className="text-[28px] w-full font-medium">All streams are Here!</h1>
          <p className="text-[15px] lg:text-sm mt-2 mb-4 leading-[22px]">
            Keep all your present, future, and past streams under your touch. Enjoy secure,
            efficient, and user-friendly experience of token streaming.
          </p>
          <div className="absolute bottom-4 left-8">
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
        <Image src={cardLogo} alt="logo" width={490} className="md:w-[300px] lg:w-[400px]" />
      </CCard>
    </div>
  );
};

export default AllStreamsCard;
