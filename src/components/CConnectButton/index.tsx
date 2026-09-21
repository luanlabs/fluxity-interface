'use client';

import Image from 'next/image';
import { useBlux } from '@bluxcc/react';
import React, { memo, useCallback, useState } from 'react';

import copyText from 'src/utils/copyText';
import { shortenAddress } from 'src/utils/shortenAddress';

import wallet from 'public/images/wallet.svg';
import blackWallet from 'public/images/blackWallet.svg';

import Modal from './modal';
import toast from '../CToast';

type CConnectButtonProps = {
  isMinimized: boolean;
};

const CConnectButton = ({ isMinimized }: CConnectButtonProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { login, isAuthenticated, user, isReady } = useBlux();

  const address = user?.address;

  const handleConnect = useCallback(() => {
    if (!address) {
      void login();
      return;
    }

    setOpenModal((isModalOpen) => !isModalOpen);
  }, [address, login]);

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleCopyAddress = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      if (address) {
        copyText(address);
        toast('success', 'Address copied successfully');
      }
    },
    [address],
  );

  return (
    <div
      className={`relative w-full flex items-center rounded-xl mobile:h-11 mobile:w-11 ${
        address
          ? openModal
            ? 'bg-midnightBlue text-white'
            : 'bg-white text-midnightBlue border-midnightBlue hover:bg-lavenderBlush'
          : 'bg-royalBlue text-white border-royalBlue hover:bg-buttonHover'
      } transition-colors duration-500 border cursor-pointer select-none`}
    >
      <button
        type="button"
        disabled={!isReady}
        className="flex justify-between items-center w-full px-[10px] h-12 disabled:cursor-not-allowed"
        onClick={handleConnect}
      >
        {address ? (
          <>
            <span
              className="flex flex-col items-start whitespace-nowrap overflow-hidden"
              onClick={handleCopyAddress}
            >
              {shortenAddress(address, 5)}
            </span>
            <Image src={openModal ? wallet : blackWallet} alt="wallet" width={24} height={24} />
          </>
        ) : (
          <>
            <span className="font-normal text-base whitespace-nowrap overflow-hidden mobile:hidden">
              Connect
            </span>
            <Image src={wallet} alt="wallet" width={24} height={24} />
          </>
        )}
      </button>
      {isAuthenticated && address && openModal && (
        <Modal
          isModalOpen={openModal}
          address={address}
          handleCloseModal={closeModal}
          isMinimized={isMinimized}
          setIsModalOpen={setOpenModal}
        />
      )}
    </div>
  );
};

export default memo(CConnectButton);
