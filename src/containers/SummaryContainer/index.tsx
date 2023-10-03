import React from 'react';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { shortenCryptoAddress } from 'src/utils/shortenAddress';

import CButton from 'src/components/CButton';
import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import { FormValues } from '../CreateStreamMainCard';

import fluxityLogo from '../../../public/images/fluxity.svg';
import summaryLogo from '../../../public/images/summary.svg';
import { CInputRateValue } from 'src/components/CInputRate';

interface SummaryProps {
  form: UseFormReturn<any, undefined>;
  children: JSX.Element | React.ReactNode;
}

const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' };

const SummaryContainer = ({ form, children }: SummaryProps) => {
  const values: FormValues = form.getValues();

  const newValues = Object.entries(values)
    .filter((value) => value[1])
    .filter((value) => {
      if (value[0] === 'rate') {
        if (value[1].amount) {
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

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-[18px] text-midnightblue">Summary</h1>
      <Image src={summaryLogo} alt="summary" width={0} height={0} />
    </div>
  );

  return (
    <div>
      <CPageCard title={summaryTitle} className="px-3 py-4">
        <ul className="grid gap-2 text-midnightblue">
          {newValues.map((x) => (
            <li
              key={x.label}
              className="flex justify-between items-center bg-alabaster h-[40px] px-[16px] text-[14px] rounded-[10px]"
            >
              <span>{x.label}</span>
              <div className="flex">
                <Image
                  src={require(`../../../public/images/assets/${x.icon}`).default}
                  alt="logo"
                  width={20}
                  height={0}
                  className="mr-[8px]"
                />

                <span>{x.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </CPageCard>

      <CCard
        bgColor="#F5EBFF"
        borderColor="#BE7CFF"
        className="flex justify-between items-center text-richlavender h-[56px] px-[10px] text-[18px] my-[16px]"
      >
        <p>Total Amount</p>
        <p>100 XLM</p>
      </CCard>
      {children}
    </div>
  );
};

export default SummaryContainer;
