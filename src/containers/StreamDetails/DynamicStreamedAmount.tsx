/* eslint-disable react-hooks/exhaustive-deps */

import humanizeAmount from 'src/utils/humanizeAmount';

interface DynamicStreamedAmountProps {
  token: string;
  streamAmount: string;
  isCancelled: boolean;
  isVesting: boolean;
}

const DynamicStreamedAmount = ({
  token,
  streamAmount,
  isCancelled,
  isVesting,
}: DynamicStreamedAmountProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-[40px] flex justify-center w-[100%] gap-2 sm:font-medium">
        <div className="text-center">
          <h2 className="text-[40px]">
            {isCancelled ? '' : '+'}
            {humanizeAmount(streamAmount)}
          </h2>
        </div>
        <div>
          <p>{token}</p>
        </div>
      </div>
      <p className="text-base">{isVesting ? 'Total vested amount' : 'Total amount streamed'}</p>
    </div>
  );
};

export default DynamicStreamedAmount;
