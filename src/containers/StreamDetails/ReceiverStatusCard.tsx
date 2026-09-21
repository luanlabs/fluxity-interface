import { useState } from 'react';
import { useBlux, useNetwork, useWriteContract } from '@bluxcc/react';

import BN from 'src/utils/BN';
import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import CButton from 'src/components/CButton';
import formatUnits from 'src/utils/formatUnits';
import CPageCard from 'src/components/CPageCard';
import humanizeAmount from 'src/utils/humanizeAmount';
import CProcessModal from 'src/components/CProcessModal';
import CSummaryField from 'src/components/CSummaryField';
import CModalSuccess from 'src/components/CModalSuccess';
import { IResponseStream, OperationType } from 'src/models';
import informWithdrawAPI from 'src/features/informWithdrawAPI';
import SingleButtonModal from 'src/components/SingleButtonModal';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';

import whiteWithdrawLogo from '/public/images/whiteWithdraw.svg';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';
import explorersLink from 'src/constants/explorersLink';

interface ReceiverStatusCardProps {
  stream: IResponseStream;
  token: string;
  setWithdrawnAmount: (_: bigint) => void;
  withdrawnAmount: bigint;
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
  const { user } = useBlux();
  const networkPassphrase = useNetwork();
  const { mutateAsync: writeContract, isPending } = useWriteContract<bigint>();
  const address = user?.address ?? '';
  const withdrawn = formatUnits(stream.withdrawn, decimalToken);

  const [totalWithdrawnAmount, setTotalWithdrawnAmount] = useState(withdrawn);
  const [txHash, setTxHash] = useState('');

  const [approvalOpen, setIsApprovalOpen] = useState(false);
  const [withdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);

  const currentNetwork = passPhraseToNetworkDetail(networkPassphrase);

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
    try {
      const transaction = await writeContract({
        call: {
          address: currentNetwork.contract,
          fn: 'withdraw_lockup',
          args: [stream.id, 0],
        },
        options: { network: networkPassphrase },
      });
      const withdrawFinalize = await transaction.returnValue();

      if (withdrawFinalize === null) {
        throw new Error('The withdrawal did not return an amount');
      }

      setTxHash(transaction.hash);

      await timeout(100);
      setIsWithdrawSuccessOpen(true);

      informWithdrawAPI(stream.id, currentNetwork.network);
      setWithdrawnAmount(withdrawFinalize);

      setTotalWithdrawnAmount(
        new BN(formatUnits(withdrawFinalize.toString(), decimalToken))
          .plus(new BN(totalWithdrawnAmount))
          .toString(),
      );
    } catch (e) {
      toast('error', 'Failed to sign the transaction');

      return;
    }
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
        disabled={!withdrawable || isPending}
        svgLogo="withdraw"
        fill={!withdrawable ? '#9C9EA5' : '#3a21d4'}
        className={`!px-3 !py-2 h-[40px] ${!withdrawable && '!text-softGray !border-softGray hover:!bg-transparent'
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
        explorerLink={explorersLink(networkPassphrase).toLowerCase() + '/transactions/' + txHash}
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
          disabled={!withdrawable || isPending}
          logo={whiteWithdrawLogo}
          className={`!px-6 !py-8 h-[40px] rounded-xl !text-[18px] font-medium tracking-wide !bg-royalBlue hover:!bg-darkPurple shadow-xl ${!withdrawable && '!text-softGray !border-softGray hover:!bg-transparent'
            }`}
          onClick={handleWithdrawClick}
        />
      </div>
    </div>
  );
};

export default ReceiverStatusCard;
