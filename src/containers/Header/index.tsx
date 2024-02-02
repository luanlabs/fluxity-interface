import React from 'react';
import { useRouter } from 'next/navigation';

import CButton from 'src/components/CButton';
import CLink from 'src/components/CLink';
import { ExternalPages } from 'src/constants/externalPages';

import stellarLogo from 'public/images/stellar.svg';
import logoWithName from 'public/images/logoWithName.svg';
import FluxityLogo from 'src/assets/FluxityLogo';
import FluxityTypography from 'src/assets/FluxityTypography';
import Image from 'next/image';

const Header = () => {
  const router = useRouter();

  const handleClick = () => {};

  return (
    <header className="flex justify-between items-center py-3 px-6">
      <div
        className="inline-flex mobile:hidden gap-[14px] cursor-pointer"
        onClick={() => router.push(ExternalPages.LANDING)}
      >
        <FluxityLogo />
        <FluxityTypography />
      </div>
      <Image
        draggable="false"
        src={logoWithName}
        alt="logo"
        className="desktop:hidden mobile:block"
      />
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
          className="mobile:w-[122px] h-9"
        />
      </div>
    </header>
  );
};

export default Header;
