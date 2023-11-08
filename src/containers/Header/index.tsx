import React from 'react';
import { useRouter } from 'next/navigation';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';
import { ExternalPages } from 'src/constants/externalPages';

import Stellar from 'public/images/stellar.svg';
import FluxityLogo from 'src/assets/FluxityLogo';
import FluxityTypography from 'src/assets/FluxityTypography';

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
          {/* <CLink title="Documentation" url={ExternalPages.DOCUMENTATION} /> */}
          <CLink title="Community" url={ExternalPages.COMMUNITY} />
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
