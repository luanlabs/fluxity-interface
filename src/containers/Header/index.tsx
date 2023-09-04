import React from 'react';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';

import FluxityLogo from 'src/svgs/FluxityLogo';
import FluxityTypography from 'src/svgs/FluxityTypography';
import RingBell from 'src/svgs/RingBell';
import Stellar from 'public/images/Stellar.svg';
import { useRouter } from 'next/navigation';
import { ExternalPages } from 'src/constants/externalPages';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center py-3 px-6">
      <div
        className="inline-flex gap-[14px] cursor-pointer"
        onClick={() => router.push(ExternalPages.LANDING)}
      >
        <FluxityLogo />
        <FluxityTypography />
      </div>
      <div className="inline-flex gap-[12px] items-center sm:hidden">
        <span className="mr-3">
          <CLink title="Documentation" url="/" />
          <CLink title="Community" url="/" />
        </span>
        <span className="bg-alabaster hover:bg-lavenderblush h-12 w-12 rounded-full flex justify-center items-center cursor-pointer transition-all duration-700">
          <RingBell />
        </span>
        <CButton kind="simple" color="gray" content="Test Net" logo={Stellar} />
      </div>
    </header>
  );
};

export default Header;
