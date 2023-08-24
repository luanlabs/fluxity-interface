'use Client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import CareRight from 'src/svgs/CareRight';
import { NavLink as Type } from 'src/constants/types';

const CNavLink = ({ title, icon, url, isMinimized }: Type) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, url]);

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
      } w-full px-[10px] py-3 my-2`}
    >
      {isMinimized ? (
        <div
          className={`flex justify-center items-center ${
            !isActive && 'fill-softSkyBlue'
          }`}
        >
          {icon}
        </div>
      ) : (
        <>
          <span className="flex gap-2 items-center text-lg text-midnightblue">
            <span className={`${!isActive && 'fill-softSkyBlue'}`}></span>
            {icon}
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
