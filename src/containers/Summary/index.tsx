import React, { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import BN from 'src/utils/BN';

import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import { FormValues } from '../CreateStreamMainCard';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { checkBalance } from 'src/utils/checkBalance';
import { mapFormValues } from './mapFormValues';
import DetailLogo from 'src/assets/detail';
import humanizeAmount from 'src/utils/humanizeAmount';
import CTooltip from 'src/components/CTooltip';
import tooltipDetails from 'src/constants/tooltipDetails';
import {
  UserInfo,
  checkUserActived,
  checkUserBalance,
} from '../CreateStreamMainCard/checkUserActived';

interface SummaryProps {
  form: UseFormReturn<any, undefined>;
  isFormValidated: boolean;
  userInfo: UserInfo;
  address: string;
}

const Summary = ({ form, userInfo, address }: SummaryProps) => {
  const values: FormValues = form.getValues();
  const getFormValues = mapFormValues(values);

  let totalAmount = new BN(0);
  let errorMessage = '';

  if (!values.startDate) {
    values.startDate = new Date();
  }

  if (values.endDate && values?.rate?.amount && values?.rate?.rate?.value && values.token) {
    totalAmount = calculateTotalAmount(values);

    const isSuccessful = checkBalance(values.token.value, totalAmount);

    if (!isSuccessful) {
      errorMessage = 'Insufficient balance';
    }

    const isAccountActived = checkUserActived(userInfo);
    if (!isAccountActived) {
      errorMessage = 'Your account is inactive';
    }

    const isAccountNativeBalance = checkUserBalance(userInfo);
    if (!isAccountNativeBalance) {
      errorMessage = ' Insufficient XLM to make the transaction';
    }

    if (address === values.address) {
      errorMessage = 'Sender and receiver are the same';
    }
  }

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-lg text-midnightBlue">Summary</h1>
      <CTooltip text={tooltipDetails.createStream.summary} title="Summary" placement="bottom">
        <DetailLogo fill="#050142" />
      </CTooltip>
    </div>
  );

  return (
    <div className="w-[329px]">
      <CPageCard title={summaryTitle} className="px-3 py-4 mb-4 w-full ">
        <ul className="grid gap-2 text-midnightBlue">
          {getFormValues.length > 3 &&
            getFormValues.map((x) => (
              <li
                key={x.label}
                className="flex justify-between w-full overflow-hidden whitespace-nowrap items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]"
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

                  <span>{x.value}</span>
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
          <p className="font-medium w-full overflow-hidden text-right">
            {totalAmount.isZero() ? (
              '0'
            ) : (
              <div className="flex justify-end">
                <p className="text-right overflow-hidden">
                  {humanizeAmount(totalAmount.toFixed(3))}
                </p>
              </div>
            )}
          </p>
        </CCard>

        <div className="text-red-500 flex items-center w-full">
          {errorMessage && <span className="h-[15px] flex items-center mb-4">{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default Summary;
