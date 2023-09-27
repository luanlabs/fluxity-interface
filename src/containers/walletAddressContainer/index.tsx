import React, { useState } from 'react';
import Image from 'next/image';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import { shortenCryptoAddress } from 'src/utils/shortenAddress';
import { StrKey } from 'stellar-sdk';

import searchLogo from 'public/images/search.svg';
import plusLogo from 'public/images/Plus.svg';

interface WalletAddressContainer {
  onChange: (value: any) => void;
}

const WalletAddressContainer = ({ onChange }: WalletAddressContainer) => {
  const [inputValue, setInputValue] = useState('');
  const [CInputValue, setCInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setCInputValue(inputValue);
    onChange(inputValue);
    setIsOpen(false);
  };

  const handleCInputChange = (e: any) => {
    setInputValue(e.target.value.trim());
  };

  return (
    <div>
      <CLabel label="Receiver wallet address" />
      <button
        className="self-stretch w-[530px] overflow-hidden relative px-12 rounded-[12px] placeholder-[#7D7B9B] text-[#7D7B9B] text-[16px] h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none"
        onClick={handleOpenModal}
      >
        {CInputValue === '' ? (
          'Wallet address'
        ) : (
          <p className="text-midnightblue">{shortenCryptoAddress(CInputValue, 20)}</p>
        )}
        <div className="absolute bottom-4 left-3.5">
          <Image src={searchLogo} width={22} height={22} alt="inputIcon" />
        </div>
      </button>

      <CModal title="Receiver wallet address" isOpen={isOpen} setIsOpen={setIsOpen}>
        <CInput
          placeholder="Search name of token"
          icon={searchLogo}
          onChange={handleCInputChange}
        />

        {StrKey.isValidEd25519PublicKey(inputValue) ? (
          <div
            className="flex justify-between items-center mt-[23px] cursor-pointer"
            onClick={handleCloseModal}
          >
            <div className="flex items-center">
              <div className=" w-[40px] h-[40px] rounded-[100px] bg-[#f205cb]"></div>
              <span className="ml-[26px]">{shortenCryptoAddress(inputValue, 11)}</span>
            </div>

            <div className="h-[30px] w-[40px] rounded-[100px]  bg-lavenderblush hover:bg-[#f0efff95] flex justify-center items-center">
              <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
            </div>
          </div>
        ) : (
          ''
        )}
      </CModal>
    </div>
  );
};

export default WalletAddressContainer;
