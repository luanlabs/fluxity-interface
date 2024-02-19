import React from 'react';
import CBottomSheet from '../CBottomSheet';
import CDialog from '../CDialog';

type CModalProps = {
  isOpen: boolean;
  width?: string;
  title?: string;
  children: React.ReactNode;
  setIsOpen: (_: boolean) => void;
};
const CModal = ({ isOpen, setIsOpen, children, width, title }: CModalProps) => {
  return (
    <>
      <CDialog isOpen={isOpen} setIsOpen={setIsOpen} width={width} title={title} hidden>
        {children}
      </CDialog>
      <CBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contentClass="p-4"
        className="desktop:!hidden"
      >
        {title && (
          <h3 className="text-[28px] font-med text-midnightBlue leading-6 flex justify-between mb-5">
            {title}
          </h3>
        )}
        {children}
      </CBottomSheet>
    </>
  );
};

export default CModal;
