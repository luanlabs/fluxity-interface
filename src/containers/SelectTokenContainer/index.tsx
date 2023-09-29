import React, { useState } from 'react';
import Image from 'next/image';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import { SelectTokenType } from 'src/models';

import searchLogo from 'public/images/search.svg';
import arrowLogo from 'public/images/arrow.svg';
import plusLogo from 'public/images/Plus.svg';
import CLabel from 'src/components/CLabel';
import useCustomID from 'src/hooks/useCustomId';

const options: SelectTokenType[] = [
  { value: 'usdc', label: 'USDC', icon: 'usdc.svg' },
  { value: 'usdt', label: 'USDT', icon: 'usdt.svg' },
  { value: 'dai', label: 'DAI', icon: 'dai.svg' },
];

interface selectTokenProps {
  onChange: (_: SelectTokenType) => void;
}

const SelectTokenContainer = ({ onChange }: selectTokenProps) => {
  const [selectedToken, setSelectedToken] = useState<null | SelectTokenType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const id = useCustomID('selectToken');

  const handleTokenSelect = (token: SelectTokenType) => {
    setSelectedToken(token);
    setIsOpen(false);
    setSearchValue('');
    onChange(token);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(searchValue.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <CLabel label="Token" htmlFor={id} />
      <button
        className="flex justify-between w-[218px] items-center h-[56px] px-[16px] text-[18px] text-mutedblue rounded-[12px] bg-[#f5f5f5]"
        onClick={handleOpenModal}
        id={id}
      >
        {selectedToken ? (
          <div className="flex items-center justify-start">
            <Image
              src={require(`../../../public/images/assets/${selectedToken.icon}`).default}
              width={35}
              height={35}
              alt={selectedToken.label}
            />
            <p className="ml-4 text-midnightblue">{selectedToken.label}</p>
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
              key={i.value}
              onClick={() => handleTokenSelect(i)}
            >
              <div className="basis-1/6">
                <Image
                  src={require(`../../../public/images/assets/${i.icon}`).default}
                  width={45}
                  height={45}
                  alt={i.label}
                />
              </div>

              <div className="text-left w-full">
                <p className="text-[#000] text-[16px] ml-[26px] font-bold">{i.label}</p>
              </div>

              <div className="h-[30px] w-[40px] rounded-[100px]  bg-lavenderblush hover:bg-[#f0efff95] flex justify-center items-center">
                <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
              </div>
            </div>
          ))}
        </div>
      </CModal>
    </div>
  );
};

export default SelectTokenContainer;
