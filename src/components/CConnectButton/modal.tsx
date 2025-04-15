import Link from 'next/link';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useBlux } from '@bluxcc/react';

import toast from '../CToast';
import CButton from '../CButton';
import CBottomSheet from '../CBottomSheet';

import copy from 'public/images/copy.svg';
import power from 'public/images/power.svg';
import blueWorld from 'public/images/blueWorld.svg';
import arrowRight from 'public/images/arrowCircleRight.svg';

import { Optional } from 'src/models';
import copyText from 'src/utils/copyText';
import { disconnect } from 'src/reducers/user';
import { useAppDispatch } from 'src/hooks/useRedux';
import { clearTokenBalances } from 'src/reducers/tokens';
import { shortenAddress } from 'src/utils/shortenAddress';
import useOutsideClickHandler from 'src/hooks/useOutsideClickHandler';

type ModalProps = {
  isModalOpen: boolean;
  address: string;
  explorerAddress: string;
  isMinimized: boolean;
  handleCloseModal: () => void;
  setIsModalOpen: (_: boolean) => void;
};
const Modal = ({
  isModalOpen,
  address,
  handleCloseModal,
  isMinimized,
  setIsModalOpen,
  explorerAddress,
}: ModalProps) => {
  const { logout } = useBlux();
  const modalRef = useRef<Optional<HTMLDivElement>>(null);
  const bottomSheetRef = useRef<Optional<HTMLDivElement>>(null);
  useOutsideClickHandler(isModalOpen, handleCloseModal, modalRef, bottomSheetRef);

  const dispatch = useAppDispatch();

  const handleDisconnect = () => {
    logout();

    dispatch(disconnect());
    dispatch(clearTokenBalances());
  };

  const handleCopy = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    copyText(address);
    toast('success', 'Address copied successfully');
  };

  return (
    <>
      <div
        ref={modalRef}
        className={`bg-midnightBlue p-[6px] rounded-[10px] mobile:!hidden ${
          isModalOpen
            ? `fixed bottom-11 ${isMinimized ? 'left-[100px]' : 'left-[20%]'} w-[203px] z-50`
            : 'hidden'
        }`}
      >
        <div
          className="h-12 px-2 rounded-md bg-white text-midnightBlue flex justify-between items-center w-full"
          onClick={handleCopy}
        >
          <span>{shortenAddress(address, 5)}</span>
          <Image src={copy} alt="copy" />
        </div>
        <div className="flex flex-col divide-y divide-slate-700 mt-2 px-2 text-white">
          <div className="py-2 flex justify-between items-center w-full">
            <Link
              href={`${explorerAddress}/accounts/${address}`}
              className="flex justify-between w-full"
              target="_blank"
            >
              <span>Open Explorer</span>
              <Image src={arrowRight} alt="arrow" />
            </Link>
          </div>
          <div className="py-2 flex justify-between items-center w-full" onClick={handleDisconnect}>
            <span>Disconnect Wallet</span>
            <Image src={power} alt="power" />
          </div>
        </div>
      </div>
      <CBottomSheet
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        contentClass="!px-6"
        className="desktop:!hidden !z-[9998]"
      >
        <div ref={bottomSheetRef}>
          <p className="text-2xl font-medium text-midnightBlue">Wallet</p>
          <div className="flex flex-col items-center justify-center gap-2 mt-6">
            <div
              onClick={handleCopy}
              className="h-12 px-4 rounded-md bg-alabaster text-midnightBlue flex justify-between items-center w-full"
            >
              <span>{shortenAddress(address, 5)}</span>
              <Image src={copy} alt="copy" />
            </div>
            <Link
              className="flex mt-1 justify-center h-12 items-center gap-2 !text-royalBlue w-full border rounded-[10px] border-royalBlue"
              href={`${explorerAddress}/accounts/${address}`}
              target="_blank"
            >
              <Image src={blueWorld} alt="world" />
              <p>open Explorer</p>
            </Link>

            <CButton
              onClick={handleDisconnect}
              content="Disconnect Wallet"
              variant="simple"
              className="w-full my-4 p-8 !text-[#ff3939] font-medium hover:!text-error transition-all duration-700"
            />
          </div>
        </div>
      </CBottomSheet>
    </>
  );
};

export default Modal;
