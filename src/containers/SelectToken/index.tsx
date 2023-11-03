import React, { useState } from 'react';
import Image from 'next/image';
import { Horizon } from 'stellar-sdk';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import useCustomID from 'src/hooks/useCustomId';
import { SelectTokenType } from 'src/models';
import { userData } from 'src/containers/Summary/userData';
import { useAppSelector } from 'src/hooks/useRedux';

import TokenList from './TokenList';

import arrowLogo from 'public/images/arrow.svg';
import searchLogo from 'public/images/search.svg';
import tokenLogo from 'public/images/explore.svg';

interface selectTokenProps {
  onChange: (_: SelectTokenType) => void;
}

const SelectToken = ({ onChange }: selectTokenProps) => {
  const [selectedToken, setSelectedToken] = useState<null | Horizon.BalanceLine>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const id = useCustomID('selectToken');

  const isConnectWallet = useAppSelector((state) => state.user.address);

  const handleTokenSelect = (token: Horizon.BalanceLine) => {
    setSelectedToken(token);
    setIsOpen(false);
    setSearchValue('');

    onChange({
      value: token,
      label: token.asset_code || 'XLM',
      icon: 'dai.svg',
    });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const filteredOptions = userData.filter(
    (option) =>
      option.asset_type === 'native' ||
      option.asset_code?.toLowerCase().startsWith(searchValue.toLowerCase()),
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
            <Image src={tokenLogo} width={0} height={0} alt="a" />
            <p className="ml-4 text-midnightBlue">{selectedToken.asset_code || 'XLM'}</p>
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
          disabled={!isConnectWallet}
        />
        <div className="mt-[23px]">
          {isConnectWallet ? (
            <TokenList filteredOptions={filteredOptions} handleTokenSelect={handleTokenSelect} />
          ) : (
            <div className=" w-full text-center text-2xl font-med h-[200px] flex justify-center items-center text-[#8f8f8f]">
              You need to connect you wallet first.
            </div>
          )}
        </div>
      </CModal>
    </div>
  );
};

export default SelectToken;
