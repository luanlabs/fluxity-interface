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
import signTransaction from 'src/utils/soroban/signTransaction';
import withdrawStream from 'src/features/soroban/withdrawStream';
import sendTransaction from 'src/features/soroban/sendTransaction';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';

import withdrawLogo from '/public/images/withdrawSolid.svg';

interface ReceiverStatusCardProps {
  withdrawn: string;
  amount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  isCanellable: boolean;
  id: string;
  token: string;
  sender: string;
}

const ReceiverStatusCard = ({
  amount,
  withdrawn,
  startDate,
  endDate,
  cliffDate,
  isCanellable,
  id,
  token,
  sender,
}: ReceiverStatusCardProps) => {
  const address = useAppSelector((state) => state.user.address);

  const [approvalOpen, setIsApprovalOpen] = useState(false);
  const [withdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);

  const available = calculateStreamAmounts(
    startDate,
    endDate,
    cliffDate,
    amount,
  ).receiverAmount.minus(withdrawn);

  const withdrawable = isStreamWithdrawable(
    startDate,
    endDate,
    cliffDate,
    Number(amount),
    Number(withdrawn),
    isCanellable,
  );

  const handleWithdrawClick = async () => {
    setIsApprovalOpen(true);

    const withdrawStreamXdr = await withdrawStream(id, BigInt(amount), address);

    let signedXdr;
    let tx;

    try {
      signedXdr = await signTransaction(address, withdrawStreamXdr);
      tx = await sendTransaction(signedXdr);
    } catch (e) {
      setIsApprovalOpen(false);
      toast('error', 'Failed to sign the transaction');

      return;
    }

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);

      if (!finalize) {
        setIsApprovalOpen(false);
        toast('error', 'Token withdrawal unsuccessful');

        return;
      }
    } else {
      setIsApprovalOpen(false);
      return;
    }

    setIsApprovalOpen(false);
    await timeout(100);
    setIsWithdrawSuccessOpen(true);
  };

  const handleModalButton = () => {
    setIsWithdrawSuccessOpen(false);
  };

  const ReceiverStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Withdraw"
        disabled={withdrawable}
        logo={withdrawLogo}
        className={`!px-3 !py-2 h-[40px] ${
          withdrawable && '!text-softGray !border-softGray hover:!bg-transparent'
        }`}
        onClick={handleWithdrawClick}
      />
    </div>
  );

  return (
    <div className="w-full">
      <CPageCard title={ReceiverStatusCardTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField label="Available" value={available.toFixed(3)} fieldSize="large" />
          <CSummaryField label="Withdraw" value={new BN(withdrawn).toFixed(3)} fieldSize="large" />
        </div>
      </CPageCard>

      <CProcessModal
        isOpen={approvalOpen}
        setIsOpen={setIsApprovalOpen}
        title="Waiting for token withdrawal transaction approval"
      />

      <CModalSuccess
        successLogoColor="green"
        title="Token withdrawal successful"
        streamId={id}
        from={sender}
        token={token}
        amountTitle="Amount"
        amount={new BN(amount).toFixed(3)}
        buttonVariant="simple"
        buttonText="Close"
        isOpen={withdrawSuccessOpen}
        setIsOpen={setIsWithdrawSuccessOpen}
        onClick={handleModalButton}
      />
    </div>
  );
};

export default ReceiverStatusCard;
