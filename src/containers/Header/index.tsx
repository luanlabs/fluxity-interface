import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwitchNetwork, useNetwork } from '@bluxcc/react';

import CLink from 'src/components/CLink';
import CButton from 'src/components/CButton';
import { ExternalPages } from 'src/constants/externalPages';
import { setNetwork } from 'src/reducers/user';
import { useAppDispatch } from 'src/hooks/useRedux';
import { Mainnet, Testnet } from 'src/constants/networks';
import { clearToken } from 'src/reducers/tokens';

import StellarLogo from 'src/assets/StellarLogo';
import logoWithName from 'public/images/logoWithName.svg';
import FluxityLogo from 'src/assets/FluxityLogo';
import FluxityTypography from 'src/assets/FluxityTypography';

const Header = () => {
  const router = useRouter();
  const { switchNetwork } = useSwitchNetwork();
  const currentNetwork = useNetwork();
  const dispatch = useAppDispatch();

  const mainnetPassphrase = 'Public Global Stellar Network ; September 2015';

  const isMainnet = currentNetwork === mainnetPassphrase;

  const handleSwitchNetwork = () => {
    const newNetwork = isMainnet ? Testnet : Mainnet;

    switchNetwork(newNetwork.networkPassphrase);
    dispatch(setNetwork(newNetwork));
    dispatch(clearToken());
  };
  return (
    <header className="flex justify-between w-full items-center py-3 desktop:py-[18px] px-6">
      <div
        className="inline-flex mobile:hidden gap-[14px] cursor-pointer"
        onClick={() => router.push('/')}
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
          <CLink title="Documentation" url={ExternalPages.DOCUMENTATION} />
          <CLink title="Community" url={ExternalPages.COMMUNITY} />
        </span>
        <CButton
          variant="simple"
          color="gray"
          onClick={handleSwitchNetwork}
          content={
            <span className="flex gap-2 items-center">
              <StellarLogo fill={isMainnet ? '#1C9B47' : 'black'} />
              <span className="w-[57px]"> {isMainnet ? 'Mainnet' : 'Testnet'}</span>
            </span>
          }
          className={`${
            isMainnet ? '!bg-paleMint !text-forestGreen !border-forestGreen' : ''
          } w-[122px] h-9`}
        />
      </div>
    </header>
  );
};

export default Header;
