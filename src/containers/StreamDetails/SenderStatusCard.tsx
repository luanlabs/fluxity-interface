import { useEffect, useState } from 'react';

import BN from 'src/utils/BN';
import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import formatUnits from 'src/utils/formatUnits';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import humanizeAmount from 'src/utils/humanizeAmount';
import CProcessModal from 'src/components/CProcessModal';
import CSummaryField from 'src/components/CSummaryField';
import CModalSuccess from 'src/components/CModalSuccess';
import informCancelAPI from 'src/features/informCancelAPI';
import { ExternalPages } from 'src/constants/externalPages';
import cancelStream from 'src/features/soroban/cancelStream';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import SingleButtonModal from 'src/components/SingleButtonModal';
import signTransaction from 'src/utils/soroban/signTransaction';
import sendTransaction from 'src/features/soroban/sendTransaction';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import calculateVestingAmounts from 'src/utils/calculateVestingAmount';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';
import { ITokenStream, CancelAmounts, OperationType } from 'src/models';
import cancelStreamReturnValues from 'src/utils/soroban/cancelStreamReturnValues';

interface SenderStatusCardProps {
  amount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  rate: string;
  token: ITokenStream;
  isCancelled: boolean;
  withdrawn: string;
  isCancelable: boolean;
  id: string;
  setCancelAmount: (_: CancelAmounts) => void;
  cancelAmount: CancelAmounts;
  isStreamCancelled: boolean;
  setIsOpenCancelModal: (_: boolean) => void;
  isOpenCancelModal: boolean;
  operationType: OperationType;
  isVesting: boolean;
}

const SenderStatusCard = ({
  amount,
  startDate,
  endDate,
  cliffDate,
  rate,
  token,
  isCancelled,
  withdrawn,
  isCancelable,
  id,
  setCancelAmount,
  cancelAmount,
  isStreamCancelled,
  setIsOpenCancelModal,
  isOpenCancelModal,
  operationType,
  isVesting,
}: SenderStatusCardProps) => {
  const address = useAppSelector((state) => state.user.address);

  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isCancelStreamConfirmOpen, setIsCancelStreamConfirmOpen] = useState(false);
  const [isReclamationModalOpen, setIsReclamationModalOpen] = useState(false);
  const [txHash, setTxHash] = useState('');

  const currentNetwork = useLoadUserNetwork();

  useEffect(() => {
    if (isOpenCancelModal) {
      setIsApprovalOpen(true);
    }
  }, [isOpenCancelModal]);

  useEffect(() => {
    setIsOpenCancelModal(false);
  }, [isApprovalOpen, setIsOpenCancelModal]);

  const handleCancelClick = async () => {
    setIsApprovalOpen(true);

    const cancelStreamXdr = await cancelStream(currentNetwork.networkPassphrase, address, id);

    let signedXdr;
    let tx;

    try {
      signedXdr = await signTransaction(address, currentNetwork.networkPassphrase, cancelStreamXdr);
      tx = await sendTransaction(signedXdr, currentNetwork.networkPassphrase);
    } catch (e) {
      setIsApprovalOpen(false);
      toast('error', 'Failed to sign the transaction');

      return;
    }

    setIsApprovalOpen(false);
    await timeout(100);
    setIsReclamationModalOpen(true);

    if (!tx) {
      setIsReclamationModalOpen(false);
      toast('error', `Token ${operationType} cancellation unsuccessful`);

      return;
    }

    setTxHash(tx.hash);

    const finalize = await finalizeTransaction(tx.hash, currentNetwork.networkPassphrase);

    if (!finalize) {
      setIsReclamationModalOpen(false);
      toast('error', `Token ${operationType} cancellation unsuccessful`);

      return;
    }

    setIsReclamationModalOpen(false);
    await timeout(100);
    setIsCancelStreamConfirmOpen(true);
    setCancelAmount(cancelStreamReturnValues(finalize));
    informCancelAPI(id);
  };

  const handleModalButton = () => {
    setIsCancelStreamConfirmOpen(false);
  };

  const senderAmount = humanizeAmount(
    isVesting
      ? calculateVestingAmounts(
          startDate,
          endDate,
          cliffDate,
          isCancelled,
          withdrawn,
          rate,
          amount,
        ).senderAmount.toString()
      : calculateStreamAmounts(
          startDate,
          endDate,
          cliffDate,
          isCancelled,
          withdrawn,
          amount,
        ).senderAmount.toString(),
  );

  const cancelledAmount = new BN(
    formatUnits(cancelAmount.senderAmount.toString(), Number(token.decimals)),
  ).toString();

  const SenderStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4 sm:hidden">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content={`Cancel ${capitalizeFirstLetter(operationType)}`}
        disabled={!isCancelable || isStreamCancelled}
        className={`w-[146px] !py-2 h-[40px] text-[14px] ${
          (!isCancelable || isStreamCancelled) &&
          '!text-softGray !border-softGray hover:!bg-transparent'
        }`}
        onClick={handleCancelClick}
      />
    </div>
  );

  const ModalButton = (
    <SingleButtonModal
      buttonText="Close"
      buttonVariant="form"
      logoColor="#fff"
      onClick={handleModalButton}
    />
  );

  return (
    <div className="w-full sm:pb-4">
      <CPageCard
        title={SenderStatusCardTitle}
        borderStatus="bordered"
        className="px-3 py-4 mb-4 sm:pb-1 sm:mb-0 sm:pt-3 w-full"
      >
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField
            hideDivider
            label="Remaining amount"
            value={isStreamCancelled ? '0' : senderAmount}
            fieldSize="large"
          />
        </div>

        <CProcessModal
          isOpen={isApprovalOpen}
          setIsOpen={setIsApprovalOpen}
          title={`Waiting for ${operationType} cancellation approval`}
        />

        <CProcessModal
          isOpen={isReclamationModalOpen}
          setIsOpen={setIsReclamationModalOpen}
          title="Waiting for amount reclamation completion"
        />

        <CModalSuccess
          tooltipTitle="Cancel"
          tooltipDetails={`This is the amount refunded to your wallet after ${operationType} cancellation`}
          successLogoColor="green"
          title={`${capitalizeFirstLetter(operationType)} cancellation successful`}
          token={token.symbol}
          amountTitle="Amount"
          amount={humanizeAmount(cancelledAmount).toString()}
          explorerLink={ExternalPages.EXPLORER + '/transactions/' + txHash}
          isOpen={isCancelStreamConfirmOpen}
          setIsOpen={setIsCancelStreamConfirmOpen}
          ButtonPart={ModalButton}
        />
      </CPageCard>
    </div>
  );
};

export default SenderStatusCard;
