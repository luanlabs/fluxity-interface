'use Client';

import { useRouter } from 'next/navigation';

import CareRight from 'src/assets/CareRight';
import { CNavLinkProps as Type } from 'src/constants/types';
import useIsActive from './useIsActive';

const CNavLink = ({ title, icon, activeIcon, url, isMinimized }: Type) => {
  const router = useRouter();
  const isActive = useIsActive(url);

  const handleClick = () => {
    router.push(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`select-none w-full ${
        isMinimized ? 'flex justify-start' : 'inline-flex justify-between'
      } items-center rounded-xl ${
        isActive && ' bg-softSkyBlue transition-all duration-500'
      } w-full px-[10px] h-[52px] cursor-pointer overflow-hidden`}
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
    </div>
  );
};

export default CNavLink;
