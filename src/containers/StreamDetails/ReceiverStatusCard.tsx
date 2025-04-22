import { useState } from 'react';
import { useBlux } from '@bluxcc/react';

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
import { IResponseStream, OperationType } from 'src/models';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import informWithdrawAPI from 'src/features/informWithdrawAPI';
import SingleButtonModal from 'src/components/SingleButtonModal';
import withdrawStream from 'src/features/soroban/withdrawStream';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';
import withdrawStreamReturnValue from 'src/utils/soroban/withdrawStreamReturnValue';

import whiteWithdrawLogo from '/public/images/whiteWithdraw.svg';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';
import explorersLink from 'src/constants/explorersLink';

interface ReceiverStatusCardProps {
  stream: IResponseStream;
  token: string;
  setWithdrawnAmount: (_: number) => void;
  withdrawnAmount: number;
  decimalToken: number;
  operationType: OperationType;
}

const ReceiverStatusCard = ({
  stream,
  setWithdrawnAmount,
  withdrawnAmount,
  decimalToken,
  operationType,
}: ReceiverStatusCardProps) => {
  const { sendTransaction } = useBlux();
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
    const withdrawStreamXdr = await withdrawStream(
      currentNetwork.networkPassphrase,
      address,
      stream.id,
    );

    let tx;

    try {
      tx = await sendTransaction(withdrawStreamXdr.toXDR(), { isSoroban: true });
    } catch (e) {
      toast('error', 'Failed to sign the transaction');

      return;
    }

    setTxHash(tx.txHash);

    await timeout(100);
    setIsWithdrawSuccessOpen(true);

    informWithdrawAPI(
      stream.id,
      passPhraseToNetworkDetail(currentNetwork.networkPassphrase).network,
    );
    const withdrawFinalize = withdrawStreamReturnValue(tx);
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
        title={`Waiting for ${operationType} withdrawal....`}
      />

      <CModalSuccess
        tooltipTitle="withdraw"
        tooltipDetails={`This is the amount withdrawn from the ${operationType}`}
        successLogoColor="green"
        explorerLink={
          explorersLink(currentNetwork.network).toLowerCase() + '/transactions/' + txHash
        }
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
