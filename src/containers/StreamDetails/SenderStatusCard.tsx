import BN from 'src/utils/BN';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';

import { streamData } from './mockData';

const SenderStatusCard = () => {
  const amount = BN(streamData.amount);

  const SenderStatusCardTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Cancel Stream"
        className="w-[146px] !py-2 h-[40px] text-[14px]"
      />
    </div>
  );

  return (
    <div className="w-[580px]">
      <CPageCard title={SenderStatusCardTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField label="To stream" value={amount.toString()} />
        </div>
      </CPageCard>
    </div>
  );
};

export default SenderStatusCard;
