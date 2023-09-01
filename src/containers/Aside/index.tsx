import CNavLink from 'src/components/CNavLink';

import { navLinks } from 'src/constants/navlinks';
import { Pages } from 'src/constants/pages';

import GearSix from 'src/svgs/GearSix';
import LifeBuoy from 'src/svgs/LifeBuoy';
import SquareHalf from 'src/svgs/SquareHalf';

type AsideProps = {
  isMinimized: boolean;
  onMinimized: () => void;
};

const Aside = ({ isMinimized, onMinimized }: AsideProps) => {
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
      </div>
    </aside>
  );
};

export default Aside;
