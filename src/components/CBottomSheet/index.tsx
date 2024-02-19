import Sheet from 'react-modal-sheet';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type CModalProps = {
  isOpen: boolean;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  setIsOpen: (_: boolean) => void;
  children: React.ReactNode;
  headerImage?: string | StaticImport;
  headerClassName?: string;
};

const CBottomSheet = ({
  isOpen,
  children,
  setIsOpen,
  className,
  headerClass,
  contentClass,
  headerImage,
  headerClassName,
}: CModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Sheet isOpen={isOpen} onClose={closeModal} detent="content-height" className={className}>
      <Sheet.Container className="!rounded-t-[20px]">
        <Sheet.Header className={headerClass}>
          {headerImage && (
            <div className={headerClassName}>
              <Image src={headerImage} alt="header" />
            </div>
          )}
        </Sheet.Header>
        <Sheet.Content className={contentClass}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default CBottomSheet;
