import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StrKey } from 'stellar-sdk';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import { shortenCryptoAddress } from 'src/utils/shortenAddress';

import walletLogo from 'public/images/wallet.svg';
import plusLogo from 'public/images/Plus.svg';
import trashLogo from 'public/images/trash.svg';

import { generateRandomHexColor } from './generateRandomHexColor';

interface WalletAddressContainer {
  onChange: (value: string) => void;
  clearInputClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WalletAddressContainer = ({
  onChange,
  clearInputClick,
}: WalletAddressContainer) => {
  const [recipientWalletAddress, setRecipientWalletAddress] = useState('');
  const [cinputValue, setCinputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [randomColor, setRandomColor] = useState('');

  useEffect(() => {
    setRandomColor(generateRandomHexColor());
  }, [recipientWalletAddress]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    if (recipientWalletAddress) {
      setCinputValue('');
      setRecipientWalletAddress('');
    }
  };

  const handleCInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientWalletAddress(e.target.value.trim());
  };

  const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearInputClick(e);
    setRecipientWalletAddress('');
    setCinputValue('');
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearInputClick(e);
    setRecipientWalletAddress('');
    setCinputValue('');
    setIsOpen(false);
  };

  const handleButtonModal = () => {
    setCinputValue(recipientWalletAddress);
    onChange(recipientWalletAddress);
    setIsOpen(false);
  };

  const isValidateAddress = StrKey.isValidEd25519PublicKey(
    recipientWalletAddress.toUpperCase(),
  );

  const handlePaste = () => {
    return navigator.clipboard.readText().then((clipText) => {
      setRecipientWalletAddress(clipText);
    });
  };

  const longAddress = shortenCryptoAddress(recipientWalletAddress, 20);
  const shortAddress = shortenCryptoAddress(recipientWalletAddress, 11);

  return (
    <div>
      <CLabel label="Receiver wallet address" />

      <div className="relative">
        <button
          className="self-stretch w-[530px] overflow-hidden relative px-12 rounded-[12px] placeholder-[#7D7B9B] text-[#7D7B9B] text-[16px] h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none"
          onClick={handleOpenModal}
        >
          {cinputValue === '' ? (
            'Enter wallet address'
          ) : (
            <p className="text-midnightblue">{longAddress}</p>
          )}

          <div className="absolute bottom-4 left-3.5">
            <Image src={walletLogo} width={22} height={22} alt="inputIcon" />
          </div>
        </button>

        {isValidateAddress && trashLogo && cinputValue && (
          <div
            className="absolute bottom-4 right-3.5 z-10 cursor-pointer"
            onClick={handleButtonClick}
          >
            <Image src={trashLogo} width={0} height={0} alt="clear-input" />
          </div>
        )}
      </div>

      <CModal title="Receiver wallet address" isOpen={isOpen} setIsOpen={setIsOpen}>
        <CInput
          placeholder="Enter wallet address"
          icon={walletLogo}
          clearInputClick={handleClearInput}
          value={recipientWalletAddress}
          handlePaste={handlePaste}
          onChange={handleCInputChange}
          errorMsg="The address is invalid"
          error={!isValidateAddress && recipientWalletAddress != ''}
          clearInput={isValidateAddress && recipientWalletAddress != ''}
          paste={recipientWalletAddress === ''}
          border
        />

        <div className=" h-[40px] mt-[12px]">
          {isValidateAddress && (
            <div>
              <div className="flex justify-between items-center rounded-[12px] bg-[#F9F9F9] px-[8px] py-[10px]">
                <div className="flex items-center">
                  <div
                    className="w-[32px] h-[32px] rounded-[100px] ml-1"
                    style={{ backgroundColor: randomColor }}
                  />
                  <span className="ml-[12px] text-[18px]">
                    {isValidateAddress && shortAddress}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-[35px] ">
          <button
            className="text-[16px] text-[#050142] mr-[16px]"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            className={` ${
              !isValidateAddress
                ? 'bg-[#e9e9e9] text-[#c2c2c2]'
                : 'bg-[#E4F6F9] hover:bg-[#ddf9ff]'
            }  px-[24px] py-[11px] text-[16px] rounded-[10px] text-[#050142]`}
            disabled={!isValidateAddress}
            onClick={handleButtonModal}
          >
            Confirm
          </button>
        </div>
      </CModal>
    </div>
  );
};

export default WalletAddressContainer;
