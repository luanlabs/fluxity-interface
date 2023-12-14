import CProcessModal from 'src/components/CProcessModal';

interface WithdrawTransactionProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
}
const WithdrawTransaction = ({ isOpen, setIsOpen }: WithdrawTransactionProps) => {
  return (
    <div>
      <CProcessModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title=""
        message="Approve token Access"
      />
    </div>
  );
};

export default WithdrawTransaction;
