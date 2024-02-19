'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import CCard from 'src/components/CCard';
import CDialog from 'src/components/CDialog';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import CProcessModal from 'src/components/CProcessModal';
import CBottomSheet from 'src/components/CBottomSheet';

import { ExternalPages } from 'src/constants/externalPages';

import fetch from 'src/utils/request';
import { loadClaimedTokens } from 'src/reducers/tokens';
import { hasTestnetTokens } from 'src/reducers/user';
import { IResponseTokenResult } from 'src/constants/types';
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux';

import glass from 'public/images/glass.svg';

import modalImage from 'public/images/modalImage.png';
import blueDivider from 'public/images/blueDivider.svg';
import ModalContent from './ModalContent';

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

  const onCloseModalSheet = () => {
    setIsOpen(false);
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
      <CDialog
        hidden
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hasCloseButton
        headerImage={modalImage}
        imageClassName="bg-[#9CFFBE] select-none"
        className="mobile:hidden"
      >
        <ModalContent address={address} handleClaim={handleClaim} />
      </CDialog>
      <CBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="desktop:!hidden"
        headerClass="bg-[#9CFFBE] select-none h-0"
      >
        <Image src={modalImage} alt="header" className="bg-[#9CFFBE] rounded-t-[20px]" />
        <ModalContent address={address} handleClaim={handleClaim} handleClose={onCloseModalSheet} />
      </CBottomSheet>

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
