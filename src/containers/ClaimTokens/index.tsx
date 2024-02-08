'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import CCard from 'src/components/CCard';
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import CProcessModal from 'src/components/CProcessModal';

import { shortenAddress } from 'src/utils/shortenAddress';
import { ExternalPages } from 'src/constants/externalPages';

import fetch from 'src/utils/request';
import { loadClaimedTokens } from 'src/reducers/tokens';
import { hasTestnetTokens } from 'src/reducers/user';
import { IResponseTokenResult } from 'src/constants/types';
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux';

import glass from 'public/images/glass.svg';
import wallet from 'public/images/blackWallet.svg';
import usdc from 'public/images/assets/fusdc.svg';
import dai from 'public/images/assets/fdai.svg';
import yxlm from 'public/images/assets/yxlm.png';
import modalImage from 'public/images/modalImage.png';
import blueDivider from 'public/images/blueDivider.svg';
import CModalSheet from 'src/components/CModalSheet';

const ClaimTokens = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const address = useAppSelector((state) => state.user.address);
  const hasReceivedTokens = useAppSelector((state) => state.user.hasReceivedTokens);
  const info = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!address) {
      toast('error', 'You need to connect your wallet first.');
      return;
    }

    if (hasReceivedTokens) {
      toast('error', 'You have already received testnet tokens.');
      return;
    }
    setIsOpen(true);
  };

  const handleClaim = async () => {
    setIsOpen(false);
    setOpenSecondModal(true);

    if (!info) {
      try {
        await fetch(ExternalPages.FRIENDBOT + encodeURIComponent(address));
      } catch (e) {}
    }
    try {
      const { data } = await fetch<IResponseTokenResult>(
        ExternalPages.FLUXITY_API + '/testnet/token/mint',
        {
          method: 'POST',
          body: JSON.stringify({ user: address }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const mappedTokens = data.result.map((token) => {
        return { ...token, balance: '10000000000' };
      });

      dispatch(loadClaimedTokens(mappedTokens));
      dispatch(hasTestnetTokens());

      toast('success', 'Test tokens have been transferred to your wallet successfully.');
    } catch (error) {
      toast('error', 'Failed to claim tokens, try again later.');
    } finally {
      setOpenSecondModal(false);
    }
  };

  return (
    <CCard
      borderColor="#0000001A"
      className="relative bg-white p-[19.6px] h-[238px] mobile:h-[208px] w-1/2 mobile:w-full"
    >
      <h1 className="font-medium text-2xl mobile:text-lg">Claim Testnet Tokens!</h1>

      <Image src={blueDivider} alt="Divider" className="py-4 select-none" />

      <p className="mobile:text-sm">
        Try how token streaming works with some test tokens at no cost.
      </p>

      <div className="absolute bottom-[22px] left-[24.47px]">
        <CButton
          onClick={handleClick}
          content="Claim Tokens"
          variant="simple"
          logo={glass}
          className="w-[161px] mobile:w-[140px] mobile:h-10 mobile:text-sm font-medium border-royalBlue border hover:bg-lavenderBlush transition-all duration-700"
        />
      </div>
      <CModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hasCloseButton
        headerImage={modalImage}
        imageClassName="bg-[#9CFFBE] select-none"
      >
        <>
          <div className="flex gap-2 absolute top-14 left-6">
            <span className="flex bg-white rounded-full gap-1 p-[10px] items-center">
              <Image src={usdc} alt="usdc" draggable={false} />
              <p>fUSDC</p>
            </span>
            <span className="flex bg-white rounded-full gap-1 p-[10px] pr-4 items-center">
              <Image src={dai} alt="dai" draggable={false} />
              <p>fDAI</p>
            </span>
            <span className="flex bg-white rounded-full gap-1 p-[10px] pr-4 items-center">
              <Image src={yxlm} alt="xlm" width={32} height={32} draggable={false} />
              <p>XLM</p>
            </span>
          </div>
          <div className="py-4 px-[23px]">
            <h1 className="font-medium text-2xl">Get Testnet tokens</h1>
            <p className="font-normal text-base w-2/3">
              By claiming tokens, you will receive some test tokens in your wallet to start
              streaming with Fluxity.
            </p>
            <div>
              <p className="font-normal text-[18px] mt-8">Connected Wallet Address</p>
              <CInput
                placeholder={shortenAddress(address, 20)}
                icon={wallet}
                value={shortenAddress(address, 20)}
                disabled
              />
            </div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <CButton
                onClick={handleClaim}
                content="Claim Tokens"
                variant="form"
                className="!bg-royalBlue text-white !w-[151px] hover:!bg-buttonHover transition-all duration-700"
              />
            </div>
          </div>
        </>
      </CModal>
      <CModalSheet open>
        <div className="flex gap-2 absolute top-14 left-6">
          <span className="flex bg-white rounded-full gap-1 p-[10px] items-center">
            <Image src={usdc} alt="usdc" draggable={false} />
            <p>fUSDC</p>
          </span>
          <span className="flex bg-white rounded-full gap-1 p-[10px] pr-4 items-center">
            <Image src={dai} alt="dai" draggable={false} />
            <p>fDAI</p>
          </span>
          <span className="flex bg-white rounded-full gap-1 p-[10px] pr-4 items-center">
            <Image src={yxlm} alt="xlm" width={32} height={32} draggable={false} />
            <p>XLM</p>
          </span>
        </div>
        <div className="py-4 px-[23px]">
          <h1 className="font-medium text-2xl">Get Testnet tokens</h1>
          <p className="font-normal text-base w-2/3">
            By claiming tokens, you will receive some test tokens in your wallet to start streaming
            with Fluxity.
          </p>
          <div>
            <p className="font-normal text-[18px] mt-8">Connected Wallet Address</p>
            <CInput
              placeholder={shortenAddress(address, 20)}
              icon={wallet}
              value={shortenAddress(address, 20)}
              disabled
            />
          </div>
          <hr className="my-4" />
          <div className="flex justify-end">
            <CButton
              onClick={handleClaim}
              content="Claim Tokens"
              variant="form"
              className="!bg-royalBlue text-white !w-[151px] hover:!bg-buttonHover transition-all duration-700"
            />
          </div>
        </div>
      </CModalSheet>
      <CProcessModal
        isOpen={openSecondModal}
        setIsOpen={setOpenSecondModal}
        title="Receiving Test Tokens"
        message="Test tokens are being transferred to your wallet."
      />
    </CCard>
  );
};

export default ClaimTokens;
