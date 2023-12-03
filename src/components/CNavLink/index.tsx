'use Client';

import CareRight from 'src/assets/CareRight';
import { CNavLinkProps as Type } from 'src/constants/types';
import useIsActive from './useIsActive';
import Link from 'next/link';

const CNavLink = ({ title, icon, activeIcon, url, isMinimized }: Type) => {
  const isActive = useIsActive(url);

  return (
    <Link
      href={url}
      className={`select-none w-full ${
        isMinimized ? 'flex justify-start' : 'inline-flex justify-between'
      } items-center rounded-xl ${
        isActive && ' bg-softSkyBlue transition-all duration-500'
      } w-full px-[10px] h-[48px] cursor-pointer overflow-hidden`}
    >
      <div className="flex justify-between items-center w-full overflow-hidden whitespace-nowrap">
        <span className="inline-flex gap-2 items-center text-lg text-midnightBlue md:text-base sm:text-sm whitespace-nowrap">
          {isActive ? activeIcon : icon}
          {title}
        </span>
        <span className="xxl:block hidden">
          <CareRight />
        </span>
      </div>
    </Link>
  );
};

export default CNavLink;
