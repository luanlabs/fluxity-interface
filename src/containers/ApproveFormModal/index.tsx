import Image from 'next/image';

import CModal from 'src/components/CModal';
import CButton from 'src/components/CButton';

import okLogo from 'public/images/ok.svg';

interface ApproveFormModalProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  onClick?: () => void;
}

const ApproveFormModal = ({ isOpen, setIsOpen, onClick }: ApproveFormModalProps) => {
  return (
    <div className="w-full">
      <CModal isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={okLogo} width={0} height={0} alt="ok" />
          <h1 className="text-[24px] font-bold mt-[24px] tracking-wide text-center">
            Approve token Access
          </h1>
          <p className="text-[18px] text-center mt-[12px]">
            We need to approve token access first to Continue Creating Stream.
          </p>
          <CButton
            variant="simple"
            content="Approve"
            color="blue"
            className="!rounded-[10px] w-full mt-[40px] h-[56px]"
            onClick={onClick}
          />
        </div>
      </CModal>
    </div>
  );
};

export default ApproveFormModal;
