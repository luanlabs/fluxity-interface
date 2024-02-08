import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

type CModalProps = {
  open: boolean;
  children: React.ReactNode;
};

const CModalSheet = ({ open, children }: CModalProps) => {
  return (
    <BottomSheet open={open} className="desktop:hidden">
      {children}
    </BottomSheet>
  );
};

export default CModalSheet;
