import Image from 'next/image';
import React, { useState } from 'react';

import BN from 'src/utils/BN';
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import { ISelectToken } from 'src/models';
import useCustomID from 'src/hooks/useCustomId';

import plusLogo from 'public/images/Plus.svg';
import arrowLogo from 'public/images/arrow.svg';
import searchLogo from 'public/images/search.svg';
import { useAppSelector } from 'src/hooks/useRedux';
import { IToken } from 'src/reducers/tokens';
import tokenToLogo from 'src/utils/tokenToLogo';
import fromDecimals from 'src/utils/soroban/fromDecimals';
import humanizeAmount from 'src/utils/humanizeAmount';

interface SelectTokenProps {
  onChange: (_: ISelectToken) => void;
}

const SelectToken = ({ onChange }: SelectTokenProps) => {
  const [selectedToken, setSelectedToken] = useState<null | IToken>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const id = useCustomID('selectToken');
  const tokens = useAppSelector((store) => store.tokens);

  const handleTokenSelect = (token: IToken) => {
    setIsOpen(false);
    setSearchValue('');
    setSelectedToken(token);

    onChange({
      value: token,
      label: token.symbol,
      icon: `${token.symbol.toLowerCase()}.svg`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().startsWith(searchValue.toLowerCase()),
  );

  return (
    <div>
      <CLabel label="Token" htmlFor={id} />

      <button
        className="flex justify-between w-[218px] items-center h-14 px-4 text-lg text-mutedBlue rounded-xl bg-[#f5f5f5]"
        onClick={openModal}
        id={id}
      >
        {selectedToken ? (
          <div className="flex items-center justify-start">
            <Image
              src={
                require(`../../../public/images/assets/${tokenToLogo(selectedToken)}.svg`).default
              }
              width={35}
              height={35}
              alt="Token"
            />

            <p className="ml-4 text-midnightBlue">{selectedToken.symbol}</p>
          </div>
        ) : (
          'Select token'
        )}
        <Image src={arrowLogo} alt="arrow" />
      </button>

      <CModal title="Select token" isOpen={isOpen} setIsOpen={setIsOpen}>
        <CInput placeholder="Search name of token" icon={searchLogo} onChange={handleInputChange} />

        <div className="mt-[23px]">
          {filteredTokens.map((token) => (
            <div
              className="flex items-center px-2 w-full cursor-pointer h-[72px] border-b last:border-none"
              key={token.symbol}
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex w-full items-center">
                <div className="w-[70px]">
                  <Image
                    src={require(`../../../public/images/assets/${tokenToLogo(token)}.svg`).default}
                    width={45}
                    height={45}
                    alt="a"
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-black text-base w-full font-bold">{token.symbol}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="mr-5">{humanizeAmount(fromDecimals(token.balance))}</span>
                <div className="h-[35px] w-[35px] rounded-[100px] bg-lavenderBlush hover:bg-[#f0efff95] flex justify-center items-center">
                  <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CModal>
    </div>
  );
};

export default SelectToken;
