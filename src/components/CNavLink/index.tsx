'use Client';

import { useRouter } from 'next/navigation';

import CareRight from 'src/svgs/CareRight';
import { NavLink as Type } from 'src/constants/types';
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
      className={`inline-flex ${
        isMinimized ? 'justify-center' : 'justify-between'
      } items-center rounded-xl ${
        isActive ? ' bg-softSkyBlue' : ''
      } w-full px-[10px] py-3 cursor-pointer`}
    >
      {isMinimized ? (
        <div className={`flex justify-center items-center`}>
          {isActive ? activeIcon : icon}
        </div>
      ) : (
        <>
          <span className="flex gap-2 items-center text-lg text-midnightblue md:text-base sm:text-sm whitespace-nowrap">
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
