/* eslint-disable react-hooks/exhaustive-deps */

interface DynamicStreamedAmountProps {
  token: string;
  streamAmount: string;
  isCancelled: boolean;
}

const DynamicStreamedAmount = ({
  token,
  streamAmount,
  isCancelled,
}: DynamicStreamedAmountProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-[40px] flex justify-center w-[100%] gap-2">
        <div className="text-center">
          <h2 className="text-[40px]">
            {isCancelled ? '' : '+'}
            {streamAmount}
          </h2>
        </div>
        <div>
          <p>{token}</p>
        </div>
      </div>
      <p className="text-base">Total amount streamed</p>
    </div>
  );
};

export default DynamicStreamedAmount;
