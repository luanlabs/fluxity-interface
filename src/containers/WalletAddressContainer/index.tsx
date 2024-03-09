import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { StrKey } from 'stellar-sdk';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import toast from 'src/components/CToast';
import { shortenAddress } from 'src/utils/shortenAddress';
import { generateRandomHexColor } from 'src/utils/generateRandomHexColor';

import walletLogo from 'public/images/inputWallet.svg';
import trashLogo from 'public/images/x.svg';
import tickLogo from 'public/images/tick.svg';

interface WalletAddressContainer {
  onChange: (value: string) => void;
  clearInputClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipDetails: string;
  tooltipTitle: string;
}

const WalletAddressContainer = ({
  onChange,
  clearInputClick,
  tooltipDetails,
  tooltipTitle,
  value,
  ...props
}: WalletAddressContainer) => {
  const [recipientWalletAddress, setRecipientWalletAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [randomColor, setRandomColor] = useState('');

  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleEnterKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && confirmButtonRef.current) {
        confirmButtonRef.current.click();
      }
    };

    window.addEventListener('keydown', handleEnterKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!value) {
      setRecipientWalletAddress('');
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    setRandomColor(generateRandomHexColor());
  }, [recipientWalletAddress]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);

    if (recipientWalletAddress) {
      setInputValue('');
      setRecipientWalletAddress('');
    }
  };

  const handleCInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientWalletAddress(e.target.value.trim());
  };

  const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearInputClick(e);
    setRecipientWalletAddress('');
    setInputValue('');
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearInputClick(e);
    setRecipientWalletAddress('');
    setInputValue('');
    setIsOpen(false);
  };

  const handleButtonModal = () => {
    setInputValue(recipientWalletAddress);
    onChange(recipientWalletAddress);
    setIsOpen(false);
  };

  const isValidateAddress = StrKey.isValidEd25519PublicKey(recipientWalletAddress.toUpperCase());

  const handlePaste = () => {
    try {
      navigator.clipboard.readText().then((clipText) => {
        setRecipientWalletAddress(clipText);
      });
    } catch (e) {
      // toast('error', 'The Clipboard API is not available for this browser.');
    }
  };

  const shortAddress = shortenAddress(recipientWalletAddress, 5);

  return (
    <div>
      <CLabel
        label="Recipient wallet address"
        tooltipDetails={tooltipDetails}
        tooltipTitle={tooltipTitle}
      />

      <div className="relative">
        <button
          className="self-stretch w-full overflow-hidden relative px-12 rounded-xl placeholder-[#7D7B9B] text-[#7D7B9B] text-base h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none"
          onClick={handleOpenModal}
        >
          {inputValue === '' ? (
            'Recipient wallet address'
          ) : (
            <p className="text-midnightBlue">{shortAddress}</p>
          )}

          <div className="absolute bottom-4 left-3.5">
            <Image src={walletLogo} width={22} height={22} alt="inputIcon" />
          </div>
        </button>

        {isValidateAddress && trashLogo && inputValue && (
          <span
            className="absolute bottom-4 right-3.5 z-10 cursor-pointer"
            onClick={handleButtonClick}
          >
            <Image src={trashLogo} width={0} height={0} alt="clear-input" />
          </span>
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
          {...props}
        />

        <div className="h-10 mt-3">
          {isValidateAddress && (
            <div>
              <div className="flex justify-between items-center rounded-xl bg-[#F9F9F9] px-2 py-[10px]">
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-[100px] ml-1"
                    style={{ backgroundColor: randomColor }}
                  />
                  <span className="ml-3 text-lg">{isValidateAddress && shortAddress}</span>
                </div>
                <div className="flex items-center">
                  <Image src={tickLogo} alt="tickLogo" width={0} height={0} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-[35px] ">
          <button className="text-base text-midnightBlue mr-6" onClick={handleCloseModal}>
            Close
          </button>
          <button
            className={` ${
              !isValidateAddress
                ? 'bg-lavenderGray text-softGray'
                : 'bg-royalBlue text-white hover:bg-buttonHover'
            }  px-[24px] py-[14px] text-base rounded-[10px] text-midnightBlue`}
            disabled={!isValidateAddress}
            onClick={handleButtonModal}
            ref={confirmButtonRef}
          >
            Confirm
          </button>
        </div>
      </CModal>
    </div>
  );
};

export default WalletAddressContainer;
