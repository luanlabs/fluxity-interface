import React, { useState } from 'react';
import Image from 'next/image';

import CCard from 'src/components/CCard';
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import CProcessModal from 'src/components/CProcessModal';

import { shortenAddress } from 'src/utils/shortenAddress';
import { ExternalPages } from 'src/constants/externalPages';

import { useAppSelector } from 'src/hooks/useRedux';

import glass from 'public/images/glass.svg';
import wallet from 'public/images/blackWallet.svg';
import usdc from 'public/images/usdc.svg';
import modalImage from 'public/images/modalImage.png';
import blueDivider from 'public/images/blueDivider.svg';

const ClaimTokens = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const { address, info } = useAppSelector((state) => state.user);

  const userObj = { user: address };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClaim = async () => {
    setIsOpen(false);
    setOpenSecondModal(true);

    if (!info) {
      const data = await fetch(
        ExternalPages.FRIENDBOT + encodeURIComponent(address)
      ).then((response) => response.json());
      setOpenSecondModal(false);
      if (
        (data.status === 400 &&
          data.detail.includes('createAccountAlreadyExist')) ||
        data.status === 200
      ) {
        toast(
          'success',
          'Test tokens have been transferred to your wallet successfully.'
        );
      } else {
        toast('error', 'Error occurred during your Test token transfer.');
      }
    }

    // const apiData = await fetch(ExternalPages.FLUXITY_API + '/token/mint', {
    //   method: 'POST',
    //   body: JSON.stringify(userObj),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .catch((error) => console.error(error));

    // console.log(apiData);
  };

  return (
    <CCard
      borderColor="#0000001A"
      className="relative bg-white p-[19.6px] h-[261px]"
    >
      <h1 className="font-medium text-2xl">Claim Testnet Tokens for Free!</h1>
      <Image src={blueDivider} alt="Divider" className="py-4" />
      <p>Try how token streaming works with some test tokens at no cost.</p>
      <div className="absolute bottom-[22px] right-[24.47px]">
        <CButton
          onClick={handleClick}
          content="Claim Tokens"
          variant="simple"
          logo={glass}
          className="w-[161px] font-medium border-royalBlue border hover:bg-lavenderBlush transition-all duration-700"
        />
      </div>
      <CModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hasCloseButton
        headerImage={modalImage}
        imageClassName="bg-[#9CFFBE]"
      >
        <>
          <div className="flex gap-2 absolute top-14 left-6">
            <span className="flex bg-white rounded-full gap-1 p-[10px]">
              <Image src={usdc} alt="usdc" />
              <p> fUSDC</p>
            </span>
            <span className="flex bg-white rounded-full gap-1 p-[10px]">
              <Image src={usdc} alt="usdc" />
              <p> fUSDC</p>
            </span>
          </div>
          <div className="py-4 px-[23px]">
            <h1 className="font-medium text-2xl">Get Testnet tokens</h1>
            <p className="font-normal text-base w-2/3">
              By claiming tokens, you will receive some test tokens in your
              wallet to start streaming with Fluxity.
            </p>
            <div>
              <p className="font-normal text-[18px] mt-8">
                Connected Wallet Address
              </p>
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