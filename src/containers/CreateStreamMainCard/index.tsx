'use client';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';

import CPageCard from 'src/components/CPageCard';
import SummaryContainer from '../SummaryContainer';
import CInputRate from 'src/components/CInputRate';
import CDatePicker from 'src/components/CDatePicker';
import SelectTokenContainer from '../selectTokenContainer';
import WalletAddressContainer from '../walletAddressContainer';

type FormValues = {
  address: string;
  rate: string;
  rateTime: string;
  token: object;
  startDate: Date;
  endDate: Date;
  cliffDate: Date;
};

const CreateStream = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      rateTime: 'Month',
    },
  });
  const { handleSubmit, control, getValues, setValue, watch } = form;

  watch(['startDate', 'endDate', 'cliffDate', 'rateTime']);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleFlowRateSelect = (value: any) => {
    setValue('rateTime', `${value.value}`);
  };

  const CreateStreamTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightblue pl-2 mt-2">Create Stream</h1>
    </div>
  );

  return (
    <div className="flex w-full">
      <CPageCard
        title={CreateStreamTitle}
        divider
        className="w-[580px]
        pl-[30px] pr-[18px] py-[15px]"
      >
        <div className=" w-full">
          <form method="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[24px]">
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => <WalletAddressContainer {...field} />}
              />
            </div>

            <div className="flex gap-2 items-center justify-center">
              <Controller
                name="token"
                control={control}
                render={({ field }) => <SelectTokenContainer {...field} />}
              />

              <Controller
                name="rate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CInputRate
                    placeholder="0.0"
                    label="Flow rate"
                    details="FlowRate"
                    className="basis-4/5"
                    selectOnChange={handleFlowRateSelect}
                    {...field}
                  />
                )}
              />
            </div>

            <hr className="my-[24px]" />

            {/* <div className="mb-[24px]">
              <Controller
                name="cliffDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    className="w-[236px]"
                    label="Cliff date"
                    details="Cliffdate"
                    minDate={
                      getValues('startDate')
                        ? new Date(getValues('startDate'))
                        : new Date()
                    }
                    maxDate={getValues('endDate')}
                    {...field}
                  />
                )}
              />
            </div> */}

            <div className="flex gap-2">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    {...field}
                    className="w-[236px]"
                    label="Start date (optional)"
                    minDate={new Date()}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CDatePicker
                    {...field}
                    className="w-[236px]"
                    label="End date"
                    minDate={
                      getValues('startDate')
                        ? new Date(getValues('startDate'))
                        : new Date()
                    }
                  />
                )}
              />
            </div>
          </form>
        </div>
      </CPageCard>

      <div className="ml-[24px]">
        <SummaryContainer />
      </div>

      <DevTool control={control} />
    </div>
  );
};

export default CreateStream;
