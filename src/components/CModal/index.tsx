import React from 'react';
import cn from 'classnames';

import CDialog from '../CDialog';
import CBottomSheet from '../CBottomSheet';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type CModalProps = {
  isOpen: boolean;
  width?: string;
  title?: string;
  sheetClassName?: string;
  dialogClassName?: string;
  hasCloseButton?: boolean;
  headerClassName?: string;
  children: React.ReactNode;
  setIsOpen: (_: boolean) => void;
  headerImage?: string | StaticImport;
};
const CModal = ({
  width,
  title,
  isOpen,
  children,
  setIsOpen,
  headerImage,
  hasCloseButton,
  sheetClassName,
  dialogClassName,
  headerClassName,
}: CModalProps) => {
  return (
    <>
      <CDialog
        hidden
        width={width}
        title={title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headerImage={headerImage}
        className={dialogClassName}
        hasCloseButton={hasCloseButton}
        headerClassName={headerClassName}
      >
        {children}
      </CDialog>

      <CBottomSheet
        isModalOpen={isOpen}
        contentClass="p-4"
        setIsModalOpen={setIsOpen}
        headerImage={headerImage}
        headerClassName={headerClassName}
        className={cn(`desktop:!hidden`, sheetClassName)}
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
