'use client';

import Image from 'next/image';
import { useBlux } from '@bluxcc/react';
import React, { useEffect, useState } from 'react';

import copyText from 'src/utils/copyText';
import getAccount from 'src/utils/getAccount';
import { loadTokens } from 'src/reducers/tokens';
import { shortenAddress } from 'src/utils/shortenAddress';
import getTokenBalances from 'src/features/getTokenBalances';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { setAddress, loadAccount, hasTestnetTokens } from 'src/reducers/user';

import wallet from 'public/images/wallet.svg';
import blackWallet from 'public/images/blackWallet.svg';

import Modal from './modal';
import toast from '../CToast';
import CProcessModal from '../CProcessModal';
import explorersLink from 'src/constants/explorersLink';

type CConnectButtonProps = {
  isMinimized: boolean;
};

const CConnectButton = ({ isMinimized }: CConnectButtonProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { login, isAuthenticated, user, isReady } = useBlux();

  const currentNetwork = useLoadUserNetwork();
  const address = useAppSelector((store) => store.user.address);
  const tokens = useAppSelector((store) => store.tokens);

  const handleConnect = async () => {
    if (address) {
      return;
    }

    login();
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const address = user.wallet?.address;

    if (!address) {
      return;
    }

    dispatch(setAddress(address));

    getAccount(address, currentNetwork.networkPassphrase).then((info) => {
      dispatch(loadAccount(info));
    });

    getAlreadyMinted(address).then((isMinted) => {
      if (isMinted) {
        dispatch(hasTestnetTokens());
      }
    });

    getTokenBalances(address, currentNetwork.networkPassphrase, tokens).then((updatedToken) => {
      dispatch(loadTokens(updatedToken));
    });

    toast('success', 'Wallet has been successfully connected.');
  }, [isAuthenticated]);

  return (
    <button
      disabled={!isReady}
      className={`relative w-full flex items-center rounded-xl mobile:h-11 mobile:w-11 ${
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
              explorerAddress={explorersLink(currentNetwork.network).toLowerCase()}
              isModalOpen={openModal}
              address={address}
              handleCloseModal={closeModal}
              isMinimized={isMinimized}
              setIsModalOpen={setOpenModal}
            />
          )}
        </div>
      ) : (
        <div className="w-full">
          <span className="flex justify-between items-center px-[10px] h-12">
            <p className="font-normal text-base whitespace-nowrap overflow-hidden mobile:hidden">
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
    </button>
  );
};

export default CConnectButton;
