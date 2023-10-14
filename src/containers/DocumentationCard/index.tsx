'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ExternalPages } from 'src/constants/externalPages';

import CCard from '../../components/CCard';
import CButton from '../../components/CButton';

const DocumentationCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ExternalPages.WHITEPAPER);
  };

  return (
    <div className="w-full">
      <CCard
        className="flex flex-col px-[21px] py-[13px] w-full h-full"
        bgColor="mistyrose"
        borderColor="#D98F7F"
      >
        <h1 className="text-[22px] mb-[10px] w-[32%] text-darkcoral">
          Documentation
        </h1>
        <p className="text-[16px] w-[70%] mb-[30px] text-midnightblue leading-[20px]">
          Explore the opportunities created by token streaming and how Fluxity
          provides users with the most unique experience.{' '}
        </p>
        <div className="flex items-center gap-4 mt-4 pb-2">
          <CButton
            onClick={handleClick}
            kind="simple"
            color="orange"
            content="Read Whitepaper"
            logo=""
          />
          <a href="#" className="text-[14px]">
            Learn more
          </a>
        </div>
      </CCard>
    </div>
  );
};

export default DocumentationCard;
