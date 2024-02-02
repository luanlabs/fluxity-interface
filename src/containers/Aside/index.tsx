'use client';

import { Pages } from 'src/constants/pages';
import CNavLink from 'src/components/CNavLink';
import { navLinks } from 'src/constants/navbarLinks';

import CConnectButton from 'src/components/CConnectButton';

import LifeBuoy from 'src/assets/LifeBuoy';
import SquareHalf from 'src/assets/SquareHalf';

type AsideProps = {
  isMinimized: boolean;
  onMinimized: () => void;
};

const Aside = ({ isMinimized, onMinimized }: AsideProps) => {
  return (
    <aside className="overflow-hidden mobile:h-16 flex flex-col mobile:flex-row mobile:justify-around mobile:items-center">
      <div
        className={`cursor-pointer select-none mobile:hidden ${
          isMinimized ? 'w-full ml-[10px]' : 'ml-[10px]'
        } `}
        onClick={onMinimized}
      >
        <SquareHalf />
      </div>
      <hr className="mt-[18px] mb-3 mobile:hidden" />
      {navLinks.map((item) => (
        <div key={item.title}>
          <CNavLink {...item} isMinimized={isMinimized} />
        </div>
      ))}
      <div className="mobile:hidden">
        <hr className="my-3" />
        <CNavLink
          title="FAQ"
          icon={<LifeBuoy fill="#EBFDFF" />}
          activeIcon={<LifeBuoy />}
          url={Pages.FAQ}
          isMinimized={isMinimized}
        />
      </div>
      <div className="desktop:absolute desktop:bottom-5 desktop:left-[15px] desktop:right-[15px]">
        <CConnectButton isMinimized={isMinimized} />
      </div>
    </aside>
  );
};

export default Aside;
