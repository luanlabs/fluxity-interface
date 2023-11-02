'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import freighterApi from '@stellar/freighter-api';

import fetch from 'src/utils/request';
import copyText from 'src/utils/copyText';
import getAccount from 'src/utils/getAccount';
import { shortenAddress } from 'src/utils/shortenAddress';
import { setAddress, loadAccount, hasTestnetTokens } from 'src/reducers/user';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';

import Modal from './modal';
import wallet from 'public/images/wallet.svg';
import blackWallet from 'public/images/blackWallet.svg';
import toast from '../CToast';
import CProcessModal from '../CProcessModal';
import { ExternalPages } from 'src/constants/externalPages';
import { IFluxityAPIResponse } from 'src/constants/types';

type CConnectButtonProps = {
  isMinimized: boolean;
};

const CConnectButton = ({ isMinimized }: CConnectButtonProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.user.address);

  const handleConnect = async () => {
    if (address) {
      return;
    }
    setIsOpen(true);

    freighterApi.isConnected().then((isConnected) => {
      if (!isConnected) {
        toast('error', 'Freighter wallet is not installed.');
        setIsOpen(false);
      }
    });

    try {
      const address = await freighterApi.getPublicKey();
      getAccount(address).then((info) => {
        dispatch(loadAccount(info));
      });
      dispatch(setAddress(address));
      toast('success', 'Wallet has been successfully connected.');
      // try {
      //   await fetch<IFluxityAPIResponse>(
      //     ExternalPages.FLUXITY_API + '/token/mint',
      //     {
      //       method: 'POST',
      //       body: JSON.stringify({ user: address }),
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     }
      //   );
      // } catch (error: any) {
      //   if (error.data.message === 'User has already minted tokens') {
      //     dispatch(hasTestnetTokens());
      //   }
      // }
    } catch (e) {
      toast('error', 'User has declined to be connected.');
    } finally {
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className={`relative flex items-center rounded-xl ${
        address
          ? openModal
            ? 'bg-midnightBlue text-white'
            : 'bg-white text-midnightBlue border-midnightBlue hover:bg-lavenderBlush'
          : 'bg-royalBlue text-white border-royalBlue hover:bg-buttonHover'
      } transition-colors duration-500 border cursor-pointer select-none`}
      onClick={handleConnect}
    >
      {address ? (
        <div
          className="flex justify-between items-center w-full px-[10px] h-12"
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
            {shortenAddress(address, 5)}
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
              closeModal={closeModal}
              isMinimized={isMinimized}
            />
          )}
        </div>
      ) : (
        <div className="w-full">
          <span className="flex justify-between items-center px-[10px] h-12">
            <p className="font-normal text-base whitespace-nowrap overflow-hidden">
              Connect
            </p>
            <Image src={wallet} alt="wallet" width={24} height={24} />
          </span>
        </div>
      )}
      <CProcessModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Waiting for wallet connection"
        message="You are connecting your wallet to Fluxity."
      />
    </div>
  );
};

export default CConnectButton;
