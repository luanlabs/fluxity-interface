/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IResponseStream } from 'src/models';
import amountCounter from 'src/utils/amountCounter';

const Amount = (streamData: IResponseStream) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (streamData) {
      const intervalId = setInterval(() => {
        setAmount(amountCounter(streamData));
      }, 150);

      return () => clearInterval(intervalId);
    }
  }, [amount]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-[40px]">{amount}</h2>
      <p className="text-base">Total amount streamed</p>
    </div>
  );
};

export default Amount;
