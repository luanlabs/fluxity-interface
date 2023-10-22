import React, { useState } from 'react';
import Image from 'next/image';
import { AccountResponse, Horizon } from 'stellar-sdk';

import BN from 'src/utils/BN';
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import { SelectTokenType } from 'src/models';
import CLabel from 'src/components/CLabel';
import useCustomID from 'src/hooks/useCustomId';
import { userData } from '../SummaryContainer/userData';

import searchLogo from 'public/images/search.svg';
import arrowLogo from 'public/images/arrow.svg';
import plusLogo from 'public/images/Plus.svg';

const options: SelectTokenType[] = [
  { value: 'usdc', label: 'USDC', icon: 'usdc.svg' },
  { value: 'usdt', label: 'USDT', icon: 'usdt.svg' },
  { value: 'dai', label: 'DAI', icon: 'dai.svg' },
];

interface selectTokenProps {
  onChange: (_: SelectTokenType) => void;
}

const SelectTokenContainer = ({ onChange }: selectTokenProps) => {
  const [selectedToken, setSelectedToken] =
    useState<null | Horizon.BalanceLine>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const id = useCustomID('selectToken');

  const handleTokenSelect = (token: Horizon.BalanceLine) => {
    setSelectedToken(token);
    setIsOpen(false);
    setSearchValue('');
    onChange({
      value: token.asset_code,
      label: token.asset_code,
      icon: 'dai.svg',
    });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const filteredOptions = userData.filter((option) =>
    option.asset_code?.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <CLabel label="Token" htmlFor={id} />
      <button
        className="flex justify-between w-[218px] items-center h-14 px-4 text-lg text-mutedBlue rounded-xl bg-[#f5f5f5]"
        onClick={handleOpenModal}
        id={id}
      >
        {selectedToken ? (
          <div className="flex items-center justify-start">
            <Image src="" width={35} height={35} alt="" />
            <p className="ml-4 text-midnightBlue">{selectedToken.asset_code}</p>
          </div>
        ) : (
          'Select token'
        )}
        <Image src={arrowLogo} alt="arrow" />
      </button>

      <CModal title="Select token" isOpen={isOpen} setIsOpen={setIsOpen}>
        <CInput
          placeholder="Search name of token"
          icon={searchLogo}
          onChange={handleInputChange}
        />
        <div className="mt-[23px]">
          {filteredOptions.map((i) => (
            <div
              className="flex items-center w-full cursor-pointer h-[72px] border-b last:border-none"
              key={i}
              onClick={() => handleTokenSelect(i)}
            >
              <div className="flex w-full items-center">
                <div className="w-[70px]">
                  <Image
                    src={
                      require(`../../../public/images/assets/${options[0].icon}`)
                        .default
                    }
                    width={45}
                    height={45}
                    alt="a"
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-black text-base w-full font-bold">
                    {i.asset_code}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="mr-5">{new BN(i.balance).toFixed(3)}</span>
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

export default SelectTokenContainer;
