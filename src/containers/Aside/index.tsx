'use client';

import { useState } from 'react';
import Image from 'next/image';
import freighterApi from '@stellar/freighter-api';

import CNavLink from 'src/components/CNavLink';

import { navLinks } from 'src/constants/navlinks';
import { Pages } from 'src/constants/pages';

import LifeBuoy from 'src/svgs/LifeBuoy';
import SquareHalf from 'src/svgs/SquareHalf';
import { clipText } from 'src/utils/clipText';
import copyText from 'src/utils/copyText';

import wallet from 'public/images/wallet.svg';

type AsideProps = {
  isMinimized: boolean;
  onMinimized: () => void;
};

const Aside = ({ isMinimized, onMinimized }: AsideProps) => {
  const [address, setAddress] = useState('');

  const handleConnect = () => {
    freighterApi.getPublicKey().then((address: any) => {
      setAddress(address);
    });
  };

  return (
    <aside className="overflow-hidden">
      <div
        className={`cursor-pointer ${
          isMinimized ? 'w-full ml-[10px]' : 'ml-[10px]'
        } `}
        onClick={onMinimized}
      >
        <SquareHalf />
      </div>
      <hr className="mt-[18px] mb-3" />
      {navLinks.map((item) => (
        <div key={item.title}>
          <CNavLink {...item} isMinimized={isMinimized} />
        </div>
      ))}
      <hr className="my-3" />
      <CNavLink
        title="Get Help"
        icon={<LifeBuoy fill="#EBFDFF" />}
        activeIcon={<LifeBuoy />}
        url={Pages.GET_HELP}
        isMinimized={isMinimized}
      />
      <div className="absolute bottom-5 left-[15px] right-[15px]">
        <div
          className={`flex items-center px-4 rounded-xl h-[72px] ${
            address ? 'bg-white' : 'bg-lavender'
          }  border border-midnightblue cursor-pointer relative select-none`}
          onClick={handleConnect}
        >
          {address ? (
            <div className="flex justify-between items-center ">
              <div className="flex flex-col items-start">
                <span
                  className="text-midnightblue text-xl"
                  onClick={() => {
                    copyText(address);
                  }}
                >
                  {clipText(address, 4)}
                </span>
                <span className="text-[12px]">Wallet is connected</span>
              </div>
              <div className="bg-ufogreen h-[10px] w-[10px] rounded-full absolute right-5" />
            </div>
          ) : (
            <div className="flex-col items-center w-full">
              <span className="flex justify-between">
                <p className="font-normal text-base"> Connect</p>
                <Image src={wallet} alt="wallet" />
              </span>
              <p className="text-xs mt-1">connect your wallet</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
