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
    <aside className="overflow-hidden flex flex-col md:flex-row md:justify-around sm:flex-row sm:justify-around md:items-center">
      <div
        className={`cursor-pointer select-none md:hidden sm:hidden ${
          isMinimized ? 'w-full ml-[10px]' : 'ml-[10px]'
        } `}
        onClick={onMinimized}
      >
        <SquareHalf />
      </div>
      <hr className="mt-[18px] mb-3 md:hidden sm:hidden" />
      {navLinks.map((item) => (
        <div key={item.title}>
          <CNavLink {...item} isMinimized={isMinimized} />
        </div>
      ))}
      <div className="md:hidden sm:hidden">
        <hr className="my-3" />
        <CNavLink
          title="FAQ"
          icon={<LifeBuoy fill="#EBFDFF" />}
          activeIcon={<LifeBuoy />}
          url={Pages.FAQ}
          isMinimized={isMinimized}
        />
      </div>
      <div className="lg:absolute lg:bottom-5 lg:left-[15px] lg:right-[15px]">
        <CConnectButton isMinimized={isMinimized} />
      </div>
    </aside>
  );
};

export default Aside;
