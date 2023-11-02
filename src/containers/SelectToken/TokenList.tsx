import Image from 'next/image';

import BN from 'src/utils/BN';
import plusLogo from 'public/images/Plus.svg';
import logo from 'public/images/explore.svg';
import { Horizon } from 'stellar-sdk';

interface TokenListProps {
  // TODO: change the type
  filteredOptions: any;
  handleTokenSelect: (_: Horizon.BalanceLine) => void;
}

const TokenList = ({ filteredOptions, handleTokenSelect }: TokenListProps) => {
  return (
    <>
      {filteredOptions.map((i) => (
        <div
          className="flex items-center w-full text-midnightBlue tracking-wide cursor-pointer h-[72px] border-b last:border-none"
          key={i.asset_code}
          onClick={() => handleTokenSelect(i)}
        >
          <div className="flex w-full items-center">
            <div className="w-[70px]">
              <Image src={logo} width={0} height={0} alt="a" />
            </div>
            <div className="text-left w-full">
              <p className=" text-base w-full font-med">{i.asset_code || 'XLM'}</p>
            </div>
          </div>

          <div className="flex items-center">
            <span className="mr-5 font-med text-base">{new BN(i.balance).toFixed(3)}</span>
            <div className="h-[35px] w-[35px] rounded-[100px] bg-lavenderBlush hover:bg-[#f0efff95] flex justify-center items-center">
              <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TokenList;
