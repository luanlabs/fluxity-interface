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
import { sendWithdraw } from 'src/features/sendWithdraw';
import signTransaction from 'src/utils/soroban/signTransaction';
import withdrawStream from 'src/features/soroban/withdrawStream';
import sendTransaction from 'src/features/soroban/sendTransaction';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';

import withdrawLogo from '/public/images/withdrawSolid.svg';
import { ExternalPages } from 'src/constants/externalPages';

interface ReceiverStatusCardProps {
  withdrawn: string;
  amount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  isCancelled: boolean;
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
}: ReceiverStatusCardProps) => {
  const address = useAppSelector((state) => state.user.address);
  const [withdraw, setWithdraw] = useState(withdrawn);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [txHash, setTxHash] = useState('');

  const [approvalOpen, setIsApprovalOpen] = useState(false);
  const [withdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);

  const available = calculateStreamAmounts(
    startDate,
    endDate,
    cliffDate,
    isCanellable,
    withdrawn,
    amount,
  ).receiverAmount.minus(withdraw);

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

    const withdrawStreamXdr = await withdrawStream(id, address);

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
      setTxHash(tx.hash);

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

    setAvailableAmount(Number(withdraw));
    sendWithdraw(id);
    setWithdraw(new BN(withdraw).plus(new BN(available)).toString());
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
          <CSummaryField label="Withdraw" value={new BN(withdraw).toFixed(3)} fieldSize="large" />
        </div>
      </CPageCard>

      <CProcessModal
        isOpen={approvalOpen}
        setIsOpen={setIsApprovalOpen}
        title="Waiting for stream withdrawal...."
      />

      <CModalSuccess
        tooltipTitle="withdraw"
        tooltipDetails="This is the amount withdrawn from the stream"
        successLogoColor="green"
        explorerLink={ExternalPages.EXPLORER + '/transactions/' + txHash}
        title="Token withdrawal successful"
        amountTitle="Amount"
        amount={new BN(withdraw).minus(availableAmount).toFixed(3)}
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
