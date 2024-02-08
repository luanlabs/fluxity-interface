import cn from 'classnames';
import Sheet from 'react-modal-sheet';

type CModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  headerClass?: string;
};

const CModalSheet = ({ open, children, onClose, className, headerClass }: CModalProps) => {
  return (
    <Sheet
      isOpen={open}
      onClose={onClose}
      className={cn('desktop:hidden ', className)}
      detent="content-height"
    >
      <Sheet.Container className="!rounded-t-[20px]">
        <Sheet.Header className={headerClass} />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default CModalSheet;
