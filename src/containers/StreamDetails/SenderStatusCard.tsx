import { useState } from 'react';

import BN from 'src/utils/BN';
import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import CProcessModal from 'src/components/CProcessModal';
import CSummaryField from 'src/components/CSummaryField';
import CModalSuccess from 'src/components/CModalSuccess';
import cancelStream from 'src/features/soroban/cancelStream';
import signTransaction from 'src/utils/soroban/signTransaction';
import sendTransaction from 'src/features/soroban/sendTransaction';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';
import { sendCancel } from 'src/features/sendCancel';
import useGetStreamById from 'src/utils/getStreamById';

interface SenderStatusCardProps {
  amount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  receiver: string;
  token: string;
  isCancelled: boolean;
  withdrawn: string;
  isCancellable: boolean;
  id: string;
}

const SenderStatusCard = ({
  amount,
  startDate,
  endDate,
  cliffDate,
  receiver,
  token,
  isCancelled,
  withdrawn,
  isCancellable,
  id,
}: SenderStatusCardProps) => {
  const address = useAppSelector((state) => state.user.address);

  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isCancelStreamConfirmOpen, setIsCancelStreamConfirmOpen] = useState(false);
  const [isReclamationModalOpen, setIsReclamationModalOpen] = useState(false);

  const handleCancelClick = async () => {
    setIsApprovalOpen(true);

    const cancelStreamXdr = await cancelStream(id, address);

    let signedXdr;
    let tx;

    try {
      signedXdr = await signTransaction(address, cancelStreamXdr);
      tx = await sendTransaction(signedXdr);
    } catch (e) {
      setIsApprovalOpen(false);
      toast('error', 'Failed to sign the transaction');

      return;
    }

    setIsApprovalOpen(false);
    await timeout(100);
    setIsReclamationModalOpen(true);

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);

      if (!finalize) {
        setIsReclamationModalOpen(false);
        toast('error', 'Token stream cancellation unsuccessful');

        return;
      }
    } else {
      setIsReclamationModalOpen(false);
      return;
    }

    setIsReclamationModalOpen(false);
    await timeout(100);
    setIsCancelStreamConfirmOpen(true);

    sendCancel(id);
  };

  const handleModalButton = () => {
    setIsCancelStreamConfirmOpen(false);
  };

  const senderAmount = calculateStreamAmounts(
    startDate,
    endDate,
    cliffDate,
    isCancelled,
    withdrawn,
    amount,
  ).senderAmount.toFixed(3);

  const SenderStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Cancel Stream"
        disabled={!isCancellable}
        className={`w-[146px] !py-2 h-[40px] text-[14px] ${
          !isCancellable && '!text-softGray !border-softGray hover:!bg-transparent'
        }`}
        onClick={handleCancelClick}
      />
    </div>
  );

  return (
    <div className="w-full">
      <CPageCard title={SenderStatusCardTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField label="Remaining amount" value={senderAmount} fieldSize="large" />
        </div>

        <CProcessModal
          isOpen={isApprovalOpen}
          setIsOpen={setIsApprovalOpen}
          title="Waiting for stream cancellation approval"
        />

        <CProcessModal
          isOpen={isReclamationModalOpen}
          setIsOpen={setIsReclamationModalOpen}
          title="Waiting for amount reclamation completion"
        />

        <CModalSuccess
          successLogoColor="green"
          title="Token withdrawal successful"
          streamId={id}
          to={receiver}
          token={token}
          amountTitle="Amount"
          amount={new BN(amount).toFixed(3)}
          buttonVariant="simple"
          buttonText="Close"
          isOpen={isCancelStreamConfirmOpen}
          setIsOpen={setIsCancelStreamConfirmOpen}
          onClick={handleModalButton}
        />
      </CPageCard>
    </div>
  );
};

export default SenderStatusCard;
