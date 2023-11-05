import React from 'react';
import CModal from '../CModal';
import Image from 'next/image';

import rolling from 'public/images/rolling.svg';

type CProcessModalType = {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  title: string;
  message?: string;
  height?: string;
};

const CProcessModal = ({ isOpen, setIsOpen, title, message, height }: CProcessModalType) => {
  return (
    <CModal isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
      <div
        className={`flex !justify-center !items-center flex-col ${
          height ? `h-${height}` : 'h-[336px]'
        }`}
      >
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue">
          <Image src={rolling} alt="rolling" />
        </div>

        <div className="font-medium text-2xl mb-3 mt-6">{title}</div>

        {message && <div className="text-[18px] w-4/5 text-center">{message}</div>}
      </div>
    </CModal>
  );
};

export default CProcessModal;
