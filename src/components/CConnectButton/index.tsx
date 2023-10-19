'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import freighterApi from '@stellar/freighter-api';

import copyText from 'src/utils/copyText';
import { clipText } from 'src/utils/clipText';
import { setAddress } from 'src/reducers/userInfo';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';

import wallet from 'public/images/wallet.svg';
import blackWallet from 'public/images/blackWallet.svg';

import Modal from './modal';

const CConnectButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.userInfo.address);

  const handleConnect = () => {
    freighterApi.getPublicKey().then((address: string) => {
      dispatch(setAddress(address));
    });
  };
  const handleCopy = () => {
    copyText(address);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className={`flex items-center px-[10px] rounded-xl h-[56px] ${
        address
          ? openModal
            ? 'bg-midnightblue text-white'
            : 'bg-white text-midnightblue border-midnightblue'
          : 'bg-royalBlue text-white border-royalBlue'
      } transition-colors duration-500 border cursor-pointer select-none`}
      onClick={handleConnect}
    >
      {address ? (
        <div
          className="flex justify-between items-center w-full"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <p
            className="flex flex-col items-start whitespace-nowrap overflow-hidden"
            onClick={() => {
              copyText(address);
            }}
          >
            {clipText(address, 4)}
          </p>
          {openModal ? (
            <Image src={wallet} alt="wallet" width={24} height={24} />
          ) : (
            <Image src={blackWallet} alt="wallet" width={24} height={24} />
          )}
          {openModal && (
            <Modal
              open={openModal}
              address={address}
              handleCopy={handleCopy}
              closeModal={closeModal}
            />
          )}
        </div>
      ) : (
        <div className="flex-col items-center w-full">
          <span className="flex justify-between">
            <p className="font-normal text-base whitespace-nowrap overflow-hidden">
              Connect
            </p>
            <Image src={wallet} alt="wallet" width={24} height={24} />
          </span>
        </div>
      )}
    </div>
  );
};

export default CConnectButton;
