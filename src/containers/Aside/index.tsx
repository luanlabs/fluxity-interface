'use client';

import CNavLink from 'src/components/CNavLink';

import { navLinks } from 'src/constants/navlinks';
import { Pages } from 'src/constants/pages';

import LifeBuoy from 'src/svgs/LifeBuoy';
import SquareHalf from 'src/svgs/SquareHalf';

import CConnectButton from 'src/components/CConnectButton';

type AsideProps = {
  isMinimized: boolean;
  onMinimized: () => void;
};

const Aside = ({ isMinimized, onMinimized }: AsideProps) => {
  return (
    <aside className="overflow-hidden">
      <div
        className={`cursor-pointer select-none ${
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
        title="FAQ"
        icon={<LifeBuoy fill="#EBFDFF" />}
        activeIcon={<LifeBuoy />}
        url={Pages.FAQ}
        isMinimized={isMinimized}
      />
      <div className="absolute bottom-5 left-[15px] right-[15px]">
        <CConnectButton isMinimized={isMinimized} />
      </div>
    </aside>
  );
};

export default Aside;
