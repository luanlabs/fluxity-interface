import { useState } from 'react';

import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';
import { shortenAddress } from 'src/utils/shortenAddress';

import usdcLogo from 'public/images/usdc.svg';
import { IResponseStream } from 'src/models';
import decimalToNumber from 'src/utils/decimalToNumber';

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
};

const SummaryFields = (streamData: IResponseStream) => {
  const [isCancelable, setIsCancelable] = useState(false);
  const startDate = new Date(streamData.start_date * 1000);
  const endDate = new Date(streamData.end_date * 1000);
  const cliffDate = new Date(streamData.cliff_date * 1000);
  const amount = decimalToNumber(streamData.amount, 7);

  let showCliff = true;
  if (streamData.cliff_date === streamData.start_date) {
    showCliff = false;
  }

  if (streamData.cancellable_date !== streamData.start_date) {
    setIsCancelable(true);
  }

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Summary</h1>
    </div>
  );
  return (
    <div className="w-[580px]">
      <CPageCard title={summaryTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue">
          <CSummaryField label="Receiver" value={shortenAddress(streamData.receiver, 5)} />
          <CSummaryField label="Sender" value={shortenAddress(streamData.sender, 5)} />
          <CSummaryField label="Total amount" value={amount} />
          <CSummaryField
            label="Start date"
            value={startDate.toLocaleDateString('en-US', options)}
          />
          {showCliff && (
            <CSummaryField
              label="Cliff date"
              value={cliffDate.toLocaleDateString('en-US', options)}
            />
          )}

          <CSummaryField label="End date" value={endDate.toLocaleDateString('en-US', options)} />
          {/* <CSummaryField label="Token" value={streamData.token.symbol} logo={usdcLogo} /> */}
          <CSummaryField
            label="Stream type"
            value={isCancelable ? 'Cancelable' : 'Not Cancelable'}
          />
        </div>
      </CPageCard>
    </div>
  );
};

export default SummaryFields;
