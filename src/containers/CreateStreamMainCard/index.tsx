'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import CDatePicker from 'src/components/CDatePicker';
import CInputRate, { CInputRateValue } from 'src/components/CInputRate';
import validateForm from './validateForm';
import SummaryContainer from 'src/containers/Summary';
import SelectTokenContainer from 'src/containers/SelectToken';
import WalletAddressContainer from 'src/containers/WalletAddressContainer';
import CStreamingModelContainer from '../CStreamingModelContainer';
import CancellableStream, { ToggleStatus } from '../CancellableStream';
import ConfirmTransaction from '../ConfirmTransaction';
import { useAppSelector } from 'src/hooks/useRedux';
import { Model } from 'src/components/CStreamingModel';

export interface FormValues {
  address: string;
  rate: CInputRateValue;
  token: object;
  startDate: Date;
  endDate: Date;
  streamingModel: Model;
  isCancellable: ToggleStatus;
}

const INFINITY_DATE = new Date('Tue Oct 10 2100 00:00:00');

const CreateStream = () => {
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const address = useAppSelector((state) => state.user.address);

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: (formValues) => validateForm(formValues, setIsFormValidated),
    defaultValues: {
      streamingModel: 'linear',
      isCancellable: 'OFF',
      startDate: new Date(),
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

  const handleOpenModals = () => {
    setIsConfirm(true);
  };

  const isFormCompleteValidition = !isValid || isValidating || !isFormValidated || !address;

  const CreateStreamTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Create Stream</h1>
    </div>
  );

  return (
    <form method="" onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex w-full h-full">
        <CPageCard
          title={CreateStreamTitle}
          divider
          className="w-[580px] pl-[30px] pr-[18px] py-[15px] max-h-full"
        >
          <div className="w-full">
            <div>
              <Controller
                name="streamingModel"
                control={control}
                render={({ field }) => (
                  <div>
                    <CStreamingModelContainer
                      label="Streaming model"
                      details="Choose your streaming model. Linear offers a steady flow, while Exponential adapts dynamically. "
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
                      details="You can specify the rate of token transfer per various intervals."
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

            <div className="mb-6">
              <Controller
                name="isCancellable"
                control={control}
                render={({ field }) => <CancellableStream {...field} />}
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
                    label="Start date"
                    details="Cliff time specifies the date until which the stream should be withheld. When this date arrives, the accumulated amount from the stream start date until cliff date will be sent at once and the rest of the stream continues normally. "
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
                    details="By specifying the end date of your stream, the total amount to be streamed will be calculated."
                    minDate={getValues('startDate') ? new Date(getValues('startDate')) : new Date()}
                    maxDate={INFINITY_DATE}
                    readonly
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
            fill={isFormCompleteValidition ? '#050142' : '#fff'}
            className={
              isFormCompleteValidition
                ? '!bg-[#E6E6EC] !text-[#050142]'
                : '!bg-darkBlue !text-white'
            }
            disabled={isFormCompleteValidition}
            onClick={handleOpenModals}
          />
        </div>
      </div>

      <ConfirmTransaction form={form} isConfirm={isConfirm} setIsConfirm={setIsConfirm} />
    </form>
  );
};

export default CreateStream;
