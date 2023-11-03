import React from 'react';
import CModal from '../CModal';
import Image from 'next/image';

import rolling from 'public/images/rolling.svg';

type CProcessModalType = {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  title?: string;
  message?: string;
};

const CProcessModal = ({ isOpen, setIsOpen, title, message }: CProcessModalType) => {
  return (
    <div>
      <CModal isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className={`flex w-full justify-center items-center flex-col py-[30px]`}>
          <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue">
            <Image src={rolling} alt="rolling" />
          </div>
          <div className="font-medium text-center w-[90%] text-2xl mb-3 mt-6 text-midnightBlue">
            {title}
          </div>
          <div className="text-[18px] w-[90%] text-center text-midnightBlue">{message}</div>
        </div>
      </CModal>
    </div>
  );
};

export default CProcessModal;
