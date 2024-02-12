import cn from 'classnames';
import Sheet from 'react-modal-sheet';

type CModalProps = {
  open: boolean;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const CModalSheet = ({
  open,
  onClose,
  children,
  className,
  headerClass,
  contentClass,
}: CModalProps) => {
  return (
    <Sheet
      isOpen={open}
      onClose={onClose}
      detent="content-height"
      className={cn('desktop:hidden', className)}
    >
      <Sheet.Container className="!rounded-t-[20px]">
        <Sheet.Header className={headerClass} />
        <Sheet.Content className={contentClass}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default CModalSheet;
