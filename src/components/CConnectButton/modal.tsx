import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import copy from 'public/images/copy.svg';
import power from 'public/images/power.svg';
import arrowRight from 'public/images/arrowCircleRight.svg';

import copyText from 'src/utils/copyText';
import { shortenAddress } from 'src/utils/shortenAddress';
import { ExternalPages } from 'src/constants/externalPages';
import { disconnect } from 'src/reducers/user';
import { useAppDispatch } from 'src/hooks/useRedux';
import { clearTokenBalances } from 'src/reducers/tokens';

type ModalProps = {
  open: boolean;
  address: string;
  isMinimized: boolean;
  closeModal: () => void;
};
const Modal = ({ open, address, closeModal, isMinimized }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const handleDisconnect = () => {
    dispatch(disconnect());
    dispatch(clearTokenBalances());
  };

  const handleCopy = () => {
    copyText(address);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal, open]);

  return (
    <div
      ref={modalRef}
      className={`bg-midnightBlue p-[6px] rounded-[10px] ${
        open
          ? `fixed bottom-11 ${isMinimized ? 'left-[100px]' : 'left-[20%]'} w-[203px] z-50`
          : 'hidden'
      }`}
    >
      <div className="h-12 px-2 rounded-md bg-white text-midnightBlue flex justify-between items-center w-full">
        <span>{shortenAddress(address, 5)}</span>
        <Image src={copy} alt="copy" onClick={handleCopy} />
      </div>
      <div className="flex flex-col divide-y divide-slate-700 mt-2 px-2 text-white">
        <div className="py-2 flex justify-between items-center w-full">
          <Link
            href={`${ExternalPages.EXPLORER}/accounts/${address}`}
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
  );
};

export default Modal;
