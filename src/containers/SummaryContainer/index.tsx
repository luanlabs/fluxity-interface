import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';

import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import { shortenCryptoAddress } from 'src/utils/shortenAddress';
import { FormValues } from '../CreateStreamMainCard';
import { balances } from './userData';
import BN from '../../utils/BN';

import summaryLogo from '../../../public/images/summary.svg';
import { rateInNumbers } from 'src/utils/rateInNumbers';
import { calculateTotalAmount } from './calculateTotalAmount';

interface SummaryProps {
  form: UseFormReturn<any, undefined>;
  isFormValidated: boolean;
  errorMsg: string;
}

const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' };

const SummaryContainer = ({ form, isFormValidated, errorMsg }: SummaryProps) => {
  const values: FormValues = form.getValues();

  const newValues = Object.entries(values)
    .filter((value) => value[1])
    .filter((value) => {
      if (value[0] === 'rate') {
        if (value[1].amount && value[1].amount != 0) {
          return true;
        }

        return false;
      }

      return true;
    })

    .map(([label, value]) => {
      if (label === 'token') {
        return {
          label: 'Token',
          value: value.value.toUpperCase(),
          icon: value.icon,
        };
      }

      if (label === 'rate') {
        return { label: 'Flow Rate', value: `${value.amount} / ${value.rateTime.label}` };
      }

      if (label === 'startDate') {
        return { label: 'Start Date', value: value.toLocaleDateString('en-US', options) };
      }

      if (label === 'endDate') {
        return { label: 'End Date', value: value.toLocaleDateString('en-US', options) };
      }

      if (label === 'address') {
        return { label: 'To', value: shortenCryptoAddress(value, 4) };
      }

      return {
        label,
        value,
      };
    });

  // const calculateTotalAmount = (amount: string, time: number) => {
  //   const amountAsNumber = new BN(amount);

  //   let timeStampStartDate = new BN(new Date().getTime());
  //   let timeStampEndDate = new BN(endDate.getTime());

  //   if (startDate) {
  //     timeStampStartDate = new BN(startDate.getTime());
  //   }

  //   const calulateTime = timeStampEndDate.minus(timeStampStartDate);

  //   return amountAsNumber.times(calulateTime).div(new BN(time));
  // };

  // let totalAmount;

  // if (isFormValidated) {
  //   totalAmount = calculateTotalAmount(
  //     values.rate.amount,
  //     rateInNumbers(values.rate.rateTime.value),
  //   );
  // }

  // let showError;

  // if (totalAmount) {
  //   if (totalAmount.isGreaterThan(balances[0].balance)) {
  //     showError = 'The account balance is insufficient';
  //   }
  //   if (totalAmount.isNaN()) {
  //     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhoy NAAAAAAAAAAAAAAAAAAAAAAAAAAANe');
  //   }
  // }

  let totalAmount = new BN(0);

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
      rateInNumbers(values?.rate.rateTime.value),
    );
  }

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-[18px] text-midnightblue">Summary</h1>
      <Image src={summaryLogo} alt="summary" width={0} height={0} />
    </div>
  );

  return (
    <div>
      <CPageCard title={summaryTitle} className="px-3 py-4 mb-[16px]">
        <ul className="grid gap-2 text-midnightblue">
          {newValues.map((x) => (
            <li
              key={x.label}
              className="flex justify-between items-center bg-alabaster h-[40px] px-[16px] text-[14px] rounded-[10px]"
            >
              <span>{x.label}</span>
              <div className="flex">
                {x.icon && (
                  <Image
                    src={require(`/public/images/assets/${x.icon}`)}
                    alt="logo"
                    width={20}
                    height={20}
                    className="mr-[8px]"
                  />
                )}

                <span>{x.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </CPageCard>

      {totalAmount && !totalAmount.isNaN() && totalAmount.isGreaterThan(0) && (
        <div>
          <CCard
            bgColor="#F5EBFF"
            borderColor="#BE7CFF"
            className={cn(
              'flex justify-between items-center text-richlavender h-[56px] my-[16px] px-[10px] text-[18px]',
            )}
          >
            <p>Total Amount</p>
            <p>{totalAmount.toFixed(3).toString()}</p>
          </CCard>

          {errorMsg && (
            <div className="text-red-500 flex items-center my-1 mb-[16px] w-full">
              {errorMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryContainer;
