'use Client';

import { useRouter } from 'next/navigation';

import CareRight from 'src/svgs/CareRight';
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
      className={` ${
        isMinimized ? 'flex justify-center' : 'inline-flex justify-between'
      } items-center rounded-xl ${
        isActive && ' bg-softSkyBlue transition-all duration-500'
      } w-full px-[10px] h-[52px] cursor-pointer`}
    >
      {isMinimized ? (
        <div>{isActive ? activeIcon : icon}</div>
      ) : (
        <>
          <span className="inline-flex gap-2 items-center text-lg text-midnightblue md:text-base sm:text-sm whitespace-nowrap">
            {isActive ? activeIcon : icon}
            {title}
          </span>
          <span className="block lg:hidden md:hidden sm:hidden">
            <CareRight />
          </span>
        </>
      )}
    </div>
  );
};

export default CNavLink;
