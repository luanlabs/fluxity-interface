import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import BN from 'src/utils/BN';

import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import { FormValues } from '../CreateStreamMainCard';
import { rateInNumber } from 'src/utils/rateInNumber';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { checkBalance } from 'src/utils/checkBalance';
import { getFormValues } from './formValues';

import summaryLogo from 'public/images/summary.svg';

interface SummaryProps {
  form: UseFormReturn<any, undefined>;
  isFormValidated: boolean;
}

const SummaryContainer = ({ form, isFormValidated }: SummaryProps) => {
  const values: FormValues = form.getValues();

  let totalAmount = new BN(0);
  let errorMessage;

  if (
    values.startDate &&
    values.endDate &&
    values?.rate?.amount &&
    values?.rate?.rateTime?.value
  ) {
    totalAmount = calculateTotalAmount(
      values.startDate,
      values.endDate,
      new BN(values?.rate.amount),
      rateInNumber(values?.rate.rateTime.value),
    );

    const [isSuccessful, errorMsg] = checkBalance(values.token.value, totalAmount);
    errorMessage = errorMsg;
  }

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-lg text-midnightBlue">Summary</h1>
      <Image src={summaryLogo} alt="summary" width={0} height={0} />
    </div>
  );

  return (
    <div>
      <CPageCard title={summaryTitle} className="px-3 py-4 mb-4 w-[80%] ">
        <ul className="grid gap-2 text-midnightBlue">
          {getFormValues(values).length > 1 &&
            getFormValues(values).map((x) => (
              <li
                key={x.label}
                className="flex justify-between w-full whitespace-nowrap overflow-hidden text-clip items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]"
              >
                <span>{x.label}</span>
                <div className="flex">
                  {x.icon && (
                    <Image
                      src={require(`/public/images/assets/${x.icon}`)}
                      alt="logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}

                  <span className="w-full text-right">{x.value}</span>
                </div>
              </li>
            ))}
        </ul>
      </CPageCard>

      <div>
        <CCard
          bgColor="#F5EBFF"
          borderColor="#BE7CFF"
          className={cn(
            'flex justify-between items-center w-full text-richLavender mb-4 h-14 mt-4 px-[10px] text-lg',
          )}
        >
          <p className="w-full">Total Amount</p>
          <p className="font-bold w-[80%] text-clip overflow-hidden text-right">
            {totalAmount.isZero() ? '0' : totalAmount.toFixed(3).toString()}
          </p>
        </CCard>

        <div className="text-red-500 flex items-center w-full">
          {errorMessage && (
            <span className="h-[15px] flex items-center mb-4">{errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryContainer;
