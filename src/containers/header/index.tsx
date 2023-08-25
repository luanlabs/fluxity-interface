import React from 'react';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';

import LogoIcon from 'src/svgs/LogoIcon';
import LogoTypography from 'src/svgs/LogoTypography';
import RingBell from 'src/svgs/RingBell';
import Stellar from 'public/images/Stellar.svg';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-3 px-6">
      <div className="inline-flex gap-[14px]">
        <LogoIcon />
        <LogoTypography />
      </div>
      <div className="inline-flex gap-[12px] items-center md:hidden sm:hidden">
        <span className="mr-3">
          <CLink title="Documentation" url="/" />
          <CLink title="Community" url="/" />
        </span>
        <span className="bg-alabaster h-12 w-12 rounded-full flex justify-center items-center cursor-pointer">
          <RingBell />
        </span>
        <CButton kind="simple" color="gray" content="Test Net" logo={Stellar} />
      </div>
    </header>
  );
};

export default Header;
