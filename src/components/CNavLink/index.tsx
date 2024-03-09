'use Client';

import Link from 'next/link';

import useIsActive from './useIsActive';
import CareRight from 'src/assets/CareRight';
import { CNavLinkProps as Type } from 'src/constants/types';

const CNavLink = ({ title, icon, activeIcon, url, isMinimized }: Type) => {
  const isActive = useIsActive(url);

  return (
    <Link
      href={url}
      prefetch
      as={url}
      className={`select-none w-full ${
        isMinimized ? 'flex justify-start' : 'inline-flex justify-between mobile:justify-center'
      } items-center rounded-xl ${
        isActive && ' desktop:bg-softSkyBlue transition-all duration-500'
      } w-full px-[10px] h-[48px] cursor-pointer overflow-hidden`}
    >
      <div className="flex justify-between items-center w-full overflow-hidden whitespace-nowrap">
        <span className="inline-flex gap-2 items-center text-lg text-midnightBlue md:text-base sm:text-sm whitespace-nowrap">
          {isActive ? activeIcon : icon}
          <span className="mobile:hidden">{title}</span>
        </span>
        <span className="xxl:block hidden">
          <CareRight />
        </span>
      </div>
      {isActive && (
        <div className="mobile:bg-royalBlue mobile:h-[2px] mobile:rounded-full  mobile:w-[32px] mobile:absolute mobile:bottom-0" />
      )}
    </Link>
  );
};

export default CNavLink;
