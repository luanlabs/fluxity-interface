'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import CButton from 'src/components/CButton';
import { Pages } from 'src/constants/pages';

import LifeBuoy from 'public/images/lifeBuoy.svg';
import blueDivider from 'public/images/blueDivider.svg';

const FaqCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(Pages.FAQ);
  };

  return (
    <CCard borderColor="#0000001A" className="relative bg-white p-[19.6px] h-[238px] w-1/2">
      <h1 className="font-medium text-2xl">Frequently Asked Questions</h1>

      <Image src={blueDivider} alt="Divider" className="py-4" />

      <p>Find quick answers to common queries.</p>

      <div className="absolute bottom-[22px] right-[24.47px]">
        <CButton
          onClick={handleClick}
          content="FAQ"
          variant="simple"
          logo={LifeBuoy}
          className="w-[89px] font-medium border-royalBlue border hover:bg-lavenderBlush transition-all duration-700"
        />
      </div>
    </CCard>
  );
};

export default FaqCard;
