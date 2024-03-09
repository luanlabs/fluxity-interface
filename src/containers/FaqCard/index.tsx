'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import CButton from 'src/components/CButton';
import { Pages } from 'src/constants/pages';

import lifeBuoy from 'public/images/lifeBuoy.svg';
import blueDivider from 'public/images/blueDivider.svg';

const FaqCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(Pages.FAQ);
  };

  return (
    <CCard
      borderColor="#0000001A"
      className="relative bg-white p-[19.6px] short:h-[200px] h-[238px] mobile:h-[208px] w-1/2 mobile:w-full"
    >
      <h1 className="font-medium text-2xl mobile:text-lg">Frequently Asked Questions</h1>

      <Image src={blueDivider} alt="Divider" className="py-4 select-none" />

      <p className="mobile:text-sm">Find quick answers to common queries.</p>

      <div className="absolute bottom-[22px] mobile:bottom-[18px] left-[24.47px]">
        <CButton
          onClick={handleClick}
          content="FAQ"
          variant="simple"
          logo={lifeBuoy}
          className="w-[89px] mobile:w-[85px] mobile:h-10 mobile:text-sm font-medium border-royalBlue border hover:bg-lavenderBlush transition-all duration-700"
        />
      </div>
    </CCard>
  );
};

export default FaqCard;
