'use client';
import React, { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';

import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CDatePicker from 'src/components/CDatePicker';
import CInputRate, { CInputRateValue } from 'src/components/CInputRate';
import validateForm from './validateForm';
import SummaryContainer from '../Summary';
import SelectTokenContainer from '../SelectToken';
import WalletAddressContainer from '../WalletAddressContainer';
import CStreamingModelContainer from '../CStreamingModelContainer';
import { Model } from 'src/components/CStreamingModel';
import Toast from 'src/components/CToast';

export interface FormValues {
  address: string;
  rate: CInputRateValue;
  token: object;
  startDate: Date;
  endDate: Date;
  streamingModel: Model;
}

const INFINITY_DATE = new Date('Tue Oct 10 2100 00:00:00');

const CreateStream = () => {
  const [isFormValidated, setIsFormValidated] = useState(false);
  // const balances = useAppSelector((state) => state.user.info?.balances);

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: (formValues) => validateForm(formValues, setIsFormValidated),
    defaultValues: {
      streamingModel: 'linear',
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    resetField,
    formState: { errors, isValid, isValidating },
  } = form;

  watch(['startDate', 'endDate', 'rate', 'token', 'address']);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const CreateStreamTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Create Stream</h1>
    </div>
  );

  return (
    <form method="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full">
        <CPageCard
          title={CreateStreamTitle}
          divider
          className="w-[580px]
        pl-[30px] pr-[18px] py-[15px]"
        >
          <div className=" w-full">
            <div>
              <Controller
                name="streamingModel"
                control={control}
                render={({ field }) => (
                  <div>
                    <CStreamingModelContainer
                      label="Streaming model"
                      details="Streaming model"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <hr className="my-6" />

            <div className="mb-6">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <div>
                    <WalletAddressContainer
                      clearInputClick={() => resetField('address')}
                      {...field}
                    />
                  </div>
                )}
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
                render={({ field }) => (
                  <div className="w-full">
                    <CInputRate
                      placeholder="0.0"
                      label="Flow rate"
                      details="FlowRate"
                      className="basis-4/5"
                      errorMsg={errors.rate && errors.rate.message}
                      error={errors.rate?.message ? true : false}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <hr className="my-6" />

            {/* <div className="mb-6">
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
                    maxDate={getValues('endDate') && getValues('endDate')}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
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
                    maxDate={INFINITY_DATE}
                  />
                )}
              />
            </div>
          </div>
        </CPageCard>

        <div className="ml-6">
          <SummaryContainer form={form} isFormValidated={isFormValidated} />

          <CButton
            type="submit"
            variant="form"
            content="Create Stream"
            fill={!isFormValidated ? '#050142' : '#fff'}
            className={
              !isFormValidated
                ? '!bg-[#E6E6EC] !text-[#050142]'
                : '!bg-darkBlue text-white'
            }
            disabled={!isValid || isValidating || !isFormValidated}
          />
        </div>

        <DevTool control={control} />
      </div>
    </form>
  );
};

export default CreateStream;
