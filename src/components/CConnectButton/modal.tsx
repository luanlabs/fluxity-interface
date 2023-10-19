import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import copy from 'public/images/copy.svg';
import power from 'public/images/power.svg';
import arrowRight from 'public/images/arrowCircleRight.svg';

import { clipText } from 'src/utils/clipText';

type ModalProps = {
  open: boolean;
  address: string;
  handleCopy: () => void;
  closeModal: () => void;
};
const Modal = ({ open, address, handleCopy, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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
      className={`bg-midnightblue py-[10px] px-[5px] rounded-[10px] ${
        open ? 'fixed bottom-[64px] left-[265px] w-[203px] z-50' : 'hidden'
      }`}
    >
      <div className="h-[48px] px-2 rounded-md bg-white text-midnightblue flex justify-between items-center w-full">
        <span>{clipText(address, 4)}</span>
        <Image src={copy} alt="copy" onClick={handleCopy} />
      </div>
      <div className="mt-3 px-2 text-white">
        <div className="py-2 flex justify-between items-center w-full">
          <Link
            href="https://stellar.expert/explorer/public/"
            className="flex justify-between w-full"
          >
            <span>Open Explorer</span>
            <Image src={arrowRight} alt="arrow" />
          </Link>
        </div>
        <hr />
        <div className="py-2 flex justify-between items-center w-full">
          <span>Disconnect Wallet</span>
          <Image src={power} alt="power" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
