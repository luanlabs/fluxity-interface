import Image from 'next/image';
import BN from 'src/utils/BN';

import CPageCard from 'src/components/CPageCard';
import CSummaryField from 'src/components/CSummaryField';
import { IResponseStream } from 'src/models';
import formatUnits from 'src/utils/formatUnits';

import tokenLogo from 'public/images/token.svg';

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
};

interface SummaryFieldsProps {
  data: IResponseStream;
  isCancellable: boolean;
}

const SummaryFields = ({ data, isCancellable }: SummaryFieldsProps) => {
  const startDate = new Date(data.start_date * 1000);
  const endDate = new Date(data.end_date * 1000);
  const cliffDate = new Date(data.cliff_date * 1000);
  const streamAmount = formatUnits(data.amount, data.token.decimals);

  const isCliffed = cliffDate === startDate;

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Summary</h1>
    </div>
  );

  const totalAmountField = (
    <div className="flex items-center gap-1 font-medium">
      <p>{new BN(streamAmount).toFixed(3)}</p>
      <p>{data.token.symbol}</p>
      <Image
        src={data.token.logo ? data.token.logo : tokenLogo}
        alt="logo"
        width={18}
        height={18}
        className="ml-1 w-[18px] h-[18px]"
      />
    </div>
  );

  return (
    <div className="w-full">
      <CPageCard title={summaryTitle} className="px-3 py-4 mb-4 w-full">
        <div className="grid gap-2 text-midnightBlue ">
          <CSummaryField label="Total amount" value={totalAmountField} />
          <CSummaryField
            label="Start date"
            value={startDate.toLocaleDateString('en-US', options)}
          />
          {isCliffed && (
            <CSummaryField
              label="Cliff date"
              value={cliffDate.toLocaleDateString('en-US', options)}
            />
          )}

          <CSummaryField label="End date" value={endDate.toLocaleDateString('en-US', options)} />
          <CSummaryField label="Cancellable" value={isCancellable ? 'Yes' : 'No'} />
        </div>
      </CPageCard>
    </div>
  );
};

export default SummaryFields;
