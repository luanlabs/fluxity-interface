import { Ref } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

type CModalProps = {
  isOpen: boolean;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  setIsOpen: (_: boolean) => void;
  children: React.ReactNode;
};

const CBottomSheet = ({
  isOpen,
  children,
  setIsOpen,
  className,
  headerClass,
  contentClass,
}: CModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Sheet isOpen={isOpen} onClose={closeModal} detent="content-height" className={className}>
      <Sheet.Container className="!rounded-t-[20px]">
        <Sheet.Header className={headerClass} />
        <Sheet.Content className={contentClass}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default CBottomSheet;
