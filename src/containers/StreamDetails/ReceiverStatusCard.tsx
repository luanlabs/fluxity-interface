import BN from 'src/utils/BN';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';
import { calculateStreamAmounts } from 'src/utils/calculateStreamAmount';

import withdrawLogo from '/public/images/withdrawSolid.svg';

interface ReceiverStatusCardProps {
  withdrawn: string;
  amount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
}

const ReceiverStatusCard = ({
  amount,
  withdrawn,
  startDate,
  endDate,
  cliffDate,
}: ReceiverStatusCardProps) => {
  const available = calculateStreamAmounts(
    startDate,
    endDate,
    cliffDate,
    amount,
  ).receiverAmount.minus(withdrawn);

  const ReceiverStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Withdraw"
        logo={withdrawLogo}
        className="!px-3 !py-2 h-[40px]"
      />
    </div>
  );

  return (
    <div className="w-[580px]">
      <CPageCard title={ReceiverStatusCardTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField label="Available" value={available.toFixed(3)} />
          <CSummaryField label="Withdraw" value={new BN(withdrawn).toFixed(3)} />
        </div>
      </CPageCard>
    </div>
  );
};

export default ReceiverStatusCard;
