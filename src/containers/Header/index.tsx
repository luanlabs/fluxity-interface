import React from 'react';
import { useRouter } from 'next/navigation';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';
import { ExternalPages } from 'src/constants/externalPages';

import stellarLogo from 'public/images/stellar.svg';
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
      <div className="inline-flex gap-[12px] items-center">
        <span className="mr-1 sm:hidden">
          <CLink title="Whitepaper" url={ExternalPages.WHITEPAPER} />
          <CLink title="Community" url={ExternalPages.COMMUNITY} />
        </span>
        <CButton
          variant="simple"
          color="gray"
          content="Testnet"
          logo={stellarLogo}
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
