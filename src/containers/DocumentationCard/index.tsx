'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import CButton from 'src/components/CButton';
import { ExternalPages } from 'src/constants/externalPages';

const DocumentationCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ExternalPages.WHITEPAPER);
  };

  return (
    <div className="w-full">
      <CCard
        className="flex flex-col relative px-[21px] py-[13px] w-full h-[230px]"
        bgColor="mistyrose"
        borderColor="#D98F7F"
      >
        <h1 className="text-[22px] mb-[10px] text-darkCoral">Documentation</h1>
        <p className="text-base w-[70%] text-midnightBlue leading-[20px]">
          Explore the opportunities created by token streaming and how Fluxity
          provides users with the most unique experience.
        </p>
        <div className="absolute left-4 bottom-4 flex items-center gap-4">
          <CButton
            onClick={handleClick}
            variant="simple"
            color="orange"
            content="Read Whitepaper"
            logo=""
          />
          <a href="#" className="text-sm">
            Learn more
          </a>
        </div>
      </CCard>
    </div>
  );
};

export default DocumentationCard;
