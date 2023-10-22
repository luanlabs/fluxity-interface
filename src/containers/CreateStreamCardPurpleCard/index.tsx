'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import CButton from 'src/components/CButton';
import { Pages } from 'src/constants/pages';

import fluxityLogo from 'public/images/fluxity.svg';

const CreateStreamCardPurpleCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(Pages.CREATE_STREAM);
  };

  return (
    <div className="w-full">
      <CCard
        className="flex flex-col relative px-[21px] py-[13px] w-full h-[230px]"
        bgColor="#f5ebff"
        borderColor="#BE7CFF"
      >
        <h1 className="text-[22px] mb-[25px] whitespace-nowrap text-richLavender">
          Create Stream
        </h1>
        <p className="text-base w-[70%] text-midnightBlue leading-[20px]">
          Initiate token streams effortlessly; streams tailored to respond to
          your needs.
        </p>
        <div className="absolute left-4 bottom-4 flex items-center gap-4">
          <CButton
            onClick={handleClick}
            variant="simple"
            color="purple"
            content="Create Stream"
            logo={fluxityLogo}
          />
          <a href="#" className="text-sm">
            Learn more
          </a>
        </div>
      </CCard>
    </div>
  );
};

export default CreateStreamCardPurpleCard;
