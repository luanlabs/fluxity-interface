import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import searchLogo from 'public/images/search.svg';
import CButton from 'src/components/CButton';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  handleSubmitFilter: () => void;
};

const FilterModal = ({ open, closeModal, handleSubmitFilter }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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
      className={`p-[12px] bg-red-white shadow shadow-[#00000014] rounded-xl ${
        open ? `absolute top-16 right-4 w-[246px] z-50` : 'hidden'
      }`}
    >
      <div className="flex justify-between items-center rounded-[10px] w-full h-10 p-4 bg-[#F5F5F5]">
        <Image
          src={searchLogo}
          alt="search"
          className="select-none"
          draggable={false}
          width={16}
          height={16}
        />
      </div>
      <form onSubmit={handleSubmitFilter}>
        <div className="flex flex-col py-[19px] select-none space-y-1">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              name="received"
              defaultChecked
              value="received"
            />
            <label>Received Streams</label>
          </span>
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              name="sent"
              defaultChecked
              value="sent"
            />
            <label>Sent Streams</label>
          </span>
        </div>
        <CButton
          type="submit"
          content="Confirm"
          variant="simple"
          color="blue"
          className="h-9 w-full bg-royalBlue text-white transition-colors duration-700 !rounded-[10px]"
        />
      </form>
    </div>
  );
};

export default FilterModal;
