import { useEffect, useState } from 'react';

import BN from 'src/utils/BN';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';
import { useAppSelector } from 'src/hooks/useRedux';

import { streamData } from './mockData';

import withdrawLogo from '/public/images/withdrawSolid.svg';

const StatusCard = () => {
  const address = useAppSelector((state) => state.user.address);
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    if (address === streamData.sender) {
      setIsSender(true);
    }
  }, [address]);

  const amount = BN(streamData.amount);
  const widthraw = BN(streamData.withdrawn);
  const available = amount.minus(widthraw);

  const statusTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      {isSender ? (
        <CButton
          variant="simple"
          color="outline"
          content="Cancel Stream"
          className="w-[146px] !py-2 h-[40px] text-[14px]"
        />
      ) : (
        <CButton
          variant="simple"
          color="outline"
          content="Withdraw"
          logo={withdrawLogo}
          className="!px-3 !py-2 h-[40px]"
        />
      )}
    </div>
  );

  const senderCard = <CSummaryField label="To stream" value={amount.toString()} />;
  const receiverCard = (
    <div>
      <CSummaryField label="Available" value={available.toString()} />
      <CSummaryField label="Withdraw" value={widthraw.toString()} />
    </div>
  );

  return (
    <div className="w-[580px]">
      <CPageCard title={statusTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">{isSender ? senderCard : receiverCard}</div>
      </CPageCard>
    </div>
  );
};

export default StatusCard;
