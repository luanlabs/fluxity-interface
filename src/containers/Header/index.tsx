import React from 'react';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';

import FluxityLogo from 'src/assets/FluxityLogo';
import FluxityTypography from 'src/assets/FluxityTypography';
import Stellar from 'public/images/stellar.svg';
import { useRouter } from 'next/navigation';
import { ExternalPages } from 'src/constants/externalPages';

const Header = () => {
  const router = useRouter();

  const handleClick = () => {};

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
        <span className="mr-1">
          <CLink title="Documentation" url="/" />
          <CLink title="Community" url="/" />
        </span>
        <CButton
          variant="simple"
          color="gray"
          content="Testnet"
          logo={Stellar}
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
