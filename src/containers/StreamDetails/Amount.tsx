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

  const amountLength = amount.toString().length;

  let amountWidth = 'w-[130px]';
  if (amountLength >= 6) {
    amountWidth = 'w-[170px]';
  } else if (amountLength >= 7) {
    amountWidth = 'w-[190px]';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-[40px] flex justify-between">
        <h2 className={`text-[40px] ${amountWidth}`}>+{amount}</h2>
        <p>{streamData.token.symbol.toUpperCase()}</p>
      </div>
      <p className="text-base">Total amount streamed</p>
    </div>
  );
};

export default Amount;
