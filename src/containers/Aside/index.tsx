'use client';

import { useState } from 'react';

import CNavLink from 'src/components/CNavLink';

import { navLinks } from 'src/constants/navlinks';
import { Pages } from 'src/constants/pages';

import GearSix from 'src/svgs/GearSix';
import LifeBuoy from 'src/svgs/LifeBuoy';
import SquareHalf from 'src/svgs/SquareHalf';
import { clipText } from 'src/utils/clipText';
import copyText from 'src/utils/copyText';

type AsideProps = {
  isMinimized: boolean;
  onMinimized: () => void;
};

let address = 'GA3A24K44D5JXIJ4RDPZTZLGZCUCJTMO2HKCFJ5CK6FYTEVUEIICSIXW';

const Aside = ({ isMinimized, onMinimized }: AsideProps) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <aside>
      <div
        className={`cursor-pointer ${
          isMinimized ? 'w-full flex justify-center items-center' : 'ml-[10px]'
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
        <CNavLink
          title="Settings"
          icon={<GearSix fill="#EBFDFF" />}
          activeIcon={<GearSix />}
          url={Pages.SETTINGS}
          isMinimized={isMinimized}
        />
        <div
          className="py-2 px-4 rounded-xl bg-alabaster border border-midnightblue
         hover:bg-softSkyBlue transition-all duration-700 cursor-pointer relative select-none"
          onClick={() => setIsConnected(!isConnected)}
        >
          {isConnected ? (
            <div className="flex justify-between items-center">
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
            <p className="flex justify-center items-center"> Connect Wallet</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
