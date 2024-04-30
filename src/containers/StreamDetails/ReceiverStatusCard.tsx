import { useState } from 'react';

import BN from 'src/utils/BN';
import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import { IResponseStream } from 'src/models';
import formatUnits from 'src/utils/formatUnits';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import humanizeAmount from 'src/utils/humanizeAmount';
import CProcessModal from 'src/components/CProcessModal';
import CSummaryField from 'src/components/CSummaryField';
import CModalSuccess from 'src/components/CModalSuccess';
import { ExternalPages } from 'src/constants/externalPages';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import informWithdrawAPI from 'src/features/informWithdrawAPI';
import signTransaction from 'src/utils/soroban/signTransaction';
import SingleButtonModal from 'src/components/SingleButtonModal';
import withdrawStream from 'src/features/soroban/withdrawStream';
import sendTransaction from 'src/features/soroban/sendTransaction';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';
import withdrawStreamReturnValue from 'src/utils/soroban/withdrawStreamReturnValue';

import whiteWithdrawLogo from '/public/images/whiteWithdraw.svg';

interface ReceiverStatusCardProps {
  stream: IResponseStream;
  token: string;
  setWithdrawnAmount: (_: number) => void;
  withdrawnAmount: number;
  decimalToken: number;
}

const ReceiverStatusCard = ({
  stream,
  setWithdrawnAmount,
  withdrawnAmount,
  decimalToken,
}: ReceiverStatusCardProps) => {
  const address = useAppSelector((state) => state.user.address);
  const withdrawn = formatUnits(stream.withdrawn, decimalToken);

  const [totalWithdrawnAmount, setTotalWithdrawnAmount] = useState(withdrawn);
  const [txHash, setTxHash] = useState('');

  const [approvalOpen, setIsApprovalOpen] = useState(false);
  const [withdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);

  const currentNetwork = useLoadUserNetwork();

  const amount = formatUnits(stream.amount, decimalToken);

  const available = calculateStreamAmounts(
    stream.start_date,
    stream.end_date,
    stream.cliff_date,
    false,
    withdrawn,
    amount,
  ).receiverAmount.minus(totalWithdrawnAmount);

  const withdrawable = isStreamWithdrawable(stream);

  const handleWithdrawClick = async () => {
    setIsApprovalOpen(true);

    const withdrawStreamXdr = await withdrawStream(
      stream.id,
      currentNetwork.networkPassphrase,
      address,
    );

    let signedXdr;
    let tx;

    try {
      signedXdr = await signTransaction(
        address,
        currentNetwork.networkPassphrase,
        withdrawStreamXdr,
      );
      tx = await sendTransaction(signedXdr, currentNetwork.networkPassphrase);
    } catch (e) {
      setIsApprovalOpen(false);
      toast('error', 'Failed to sign the transaction');

      return;
    }

    if (!tx) {
      setIsApprovalOpen(false);
      toast('error', 'Token withdrawal unsuccessful');

      return;
    }

    const finalize = await finalizeTransaction(tx.hash, currentNetwork.networkPassphrase);
    setTxHash(tx.hash);

    if (!finalize) {
      setIsApprovalOpen(false);
      toast('error', 'Token withdrawal unsuccessful');

      return;
    }

    setIsApprovalOpen(false);
    await timeout(100);
    setIsWithdrawSuccessOpen(true);

    informWithdrawAPI(stream.id);
    const withdrawFinalize = withdrawStreamReturnValue(finalize);
    setWithdrawnAmount(withdrawFinalize);

    setTotalWithdrawnAmount(
      new BN(formatUnits(withdrawFinalize, decimalToken))
        .plus(new BN(totalWithdrawnAmount))
        .toString(),
    );
  };

  const handleModalButton = () => {
    setIsWithdrawSuccessOpen(false);
  };

  const ReceiverStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4 sm:hidden">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Withdraw"
        disabled={!withdrawable}
        svgLogo="withdraw"
        fill={!withdrawable ? '#9C9EA5' : '#3a21d4'}
        className={`!px-3 !py-2 h-[40px] ${
          !withdrawable && '!text-softGray !border-softGray hover:!bg-transparent'
        }`}
        onClick={handleWithdrawClick}
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

  const withdrawAmount = new BN(formatUnits(withdrawnAmount.toString(), decimalToken)).toString();

  return (
    <div className="w-full relative">
      <CPageCard
        title={ReceiverStatusCardTitle}
        borderStatus="bordered"
        className="px-3 py-4 mb-4 w-full"
      >
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField
            label="Available"
            value={stream.is_cancelled ? '0' : humanizeAmount(available.toString()).toString()}
            fieldSize="large"
          />
          <CSummaryField
            label="Withdrawn"
            value={humanizeAmount(totalWithdrawnAmount).toString()}
            fieldSize="large"
            hideDivider
          />
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
        amount={withdrawAmount}
        isOpen={withdrawSuccessOpen}
        setIsOpen={setIsWithdrawSuccessOpen}
        ButtonPart={ModalButton}
      />
      <div className="fixed bottom-[80px] right-2 desktop:hidden md:hidden">
        <CButton
          variant="simple"
          color="blue"
          content="Withdraw"
          disabled={!withdrawable}
          logo={whiteWithdrawLogo}
          className={`!px-6 !py-8 h-[40px] rounded-xl !text-[18px] font-medium tracking-wide !bg-royalBlue hover:!bg-darkPurple shadow-xl ${
            !withdrawable && '!text-softGray !border-softGray hover:!bg-transparent'
          }`}
          onClick={handleWithdrawClick}
        />
      </div>
    </div>
  );
};

export default ReceiverStatusCard;
