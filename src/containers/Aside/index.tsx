import CNavLink from 'src/components/CNavLink';
import { navLinks } from 'src/constants/navlinks';

import GearSix from 'src/svgs/GearSix';
import LifeBuoy from 'src/svgs/LifeBuoy';
import SquareHalf from 'src/svgs/SquareHalf';

type AsideProps = {
  isMinimized: boolean;
  onClick: () => void;
};
const Aside = ({ isMinimized, onClick }: AsideProps) => {
  return (
    <aside>
      <button className="border-none outline-none ml-2 " onClick={onClick}>
        <SquareHalf />
      </button>
      <hr className="mt-[18px] mb-3" />
      {navLinks.map((item, index) => {
        return (
          <div key={index}>
            <CNavLink {...item} isMinimized={isMinimized} />
          </div>
        );
      })}
      <hr className="my-3" />
      <CNavLink
        title="Get Help"
        icon={<LifeBuoy fill="#EBFDFF" />}
        activeIcon={<LifeBuoy />}
        url="/get-help"
        isMinimized={isMinimized}
      />
      <div className="absolute bottom-5 left-[15px] right-[15px]">
        <CNavLink
          title="Settings"
          icon={<GearSix fill="#EBFDFF" />}
          activeIcon={<GearSix />}
          url="/Settings"
          isMinimized={isMinimized}
        />
      </div>
    </aside>
  );
};

export default Aside;
