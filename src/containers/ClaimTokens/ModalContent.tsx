import React from 'react';
import Image from 'next/image';

import CInput from 'src/components/CInput';
import CButton from 'src/components/CButton';
import { shortenAddress } from 'src/utils/shortenAddress';

import wallet from 'public/images/blackWallet.svg';
import usdc from 'public/images/assets/fusdc.svg';
import dai from 'public/images/assets/fdai.svg';
import yxlm from 'public/images/assets/yxlm.png';
import blueDivider from 'public/images/blueDivider.svg';

type ModalContentProps = {
  address: string;
  handleClaim: () => Promise<void>;
  handleClose?: () => void;
};

const ModalContent = ({ handleClaim, address, handleClose }: ModalContentProps) => {
  return (
    <div>
      <div className="flex gap-2 absolute mobile:top-10 top-14 left-6">
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
        <Image src={blueDivider} alt="Divider" className="py-4 select-none" />

        <p className="font-normal text-base">
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
        <div className="flex justify-end items-center gap-3">
          <CButton
            onClick={handleClose}
            content="Close"
            variant="simple"
            className="desktop:hidden !text-midnightBlue font-medium hover:!text-buttonHover transition-all duration-700 "
          />
          <CButton
            onClick={handleClaim}
            content="Claim Tokens"
            variant="form"
            className="!bg-royalBlue text-white !w-[151px] hover:!bg-buttonHover transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
