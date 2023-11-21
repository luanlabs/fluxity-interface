import BN from 'src/utils/BN';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';

import { streamData } from './mockData';

import withdrawLogo from '/public/images/withdrawSolid.svg';

const ReceiverStatusCard = () => {
  const amount = BN(streamData.amount);
  const widthraw = BN(streamData.withdrawn);
  const available = amount.minus(widthraw);

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
          <CSummaryField label="Available" value={available.toString()} />
          <CSummaryField label="Withdraw" value={widthraw.toString()} />
        </div>
      </CPageCard>
    </div>
  );
};

export default ReceiverStatusCard;
