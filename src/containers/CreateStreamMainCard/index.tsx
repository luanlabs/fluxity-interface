'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ISelectToken } from 'src/models';
import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import { useAppSelector } from 'src/hooks/useRedux';
import CDatePicker from 'src/components/CDatePicker';
import SummaryContainer from 'src/containers/Summary';
import { Model } from 'src/components/CStreamingModel';
import SelectTokenContainer from 'src/containers/SelectToken';
import CStreamingModelContainer from '../CStreamingModelContainer';
import CInputRate, { CInputRateValue } from 'src/components/CInputRate';
import WalletAddressContainer from 'src/containers/WalletAddressContainer';

import validateForm from './validateForm';
import ConfirmTransaction from '../ConfirmTransaction';
import CancellableStream, { ToggleStatus } from '../CancellableStream';
import tooltipDetails from 'src/constants/tooltipDetails';

export interface FormValues {
  address: string;
  rate: CInputRateValue;
  token: ISelectToken;
  startDate: Date;
  endDate: Date;
  cliffDate: Date;
  streamingModel: Model;
  isCancellable: ToggleStatus;
}

const INFINITY_DATE = new Date('Tue Oct 10 2100 00:00:00');

const CreateStream = () => {
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const { address } = useAppSelector((state) => state.user);

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: (formValues) => validateForm(formValues, setIsFormValidated, address),
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

  watch(['startDate', 'endDate', 'cliffDate', 'rate', 'token', 'address']);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleOpenModals = () => {
    setIsConfirm(true);
  };

  const isFormCompleteValidation = !isValid || isValidating || !isFormValidated || !address;

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
          className="w-full pl-[30px] pr-[18px] py-[15px]"
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
                      tooltipTitle="Streaming model"
                      tooltipDetails={tooltipDetails.createStream.streamingModel}
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
                      tooltipTitle="Recipient wallet address"
                      tooltipDetails={tooltipDetails.createStream.walletAddress}
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
                      tooltipTitle="Flow rate"
                      tooltipDetails={tooltipDetails.createStream.flowRate}
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
                render={({ field }) => (
                  <CancellableStream
                    tooltipDetails={tooltipDetails.createStream.cancellableStream}
                    tooltipTitle="Cancellable Stream"
                    {...field}
                  />
                )}
              />
            </div>

            <hr className="my-6" />

            <div className="mb-6">
              <Controller
                name="cliffDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    className="w-[236px]"
                    label="Cliff date"
                    tooltipTitle="Cliff Date"
                    tooltipDetails={tooltipDetails.createStream.cliffDate}
                    minDate={getValues('startDate')}
                    maxDate={getValues('endDate')}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex gap-2">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    {...field}
                    className="w-[236px]"
                    label="Start date"
                    tooltipTitle="Start Date"
                    tooltipDetails={tooltipDetails.createStream.startDate}
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
                    tooltipTitle="End Date"
                    tooltipDetails={tooltipDetails.createStream.endDate}
                    minDate={getValues('startDate') ? new Date(getValues('startDate')) : new Date()}
                    maxDate={INFINITY_DATE}
                    readonly
                  />
                )}
              />
            </div>
          </div>
        </CPageCard>
        <div className="relative ml-6">
          <div>
            <SummaryContainer form={form} isFormValidated={isFormValidated} />

            <CButton
              type="submit"
              variant="form"
              content="Create Stream"
              fill={isFormCompleteValidation ? '#050142' : '#fff'}
              className={
                isFormCompleteValidation
                  ? '!bg-[#E6E6EC] !text-[#050142]'
                  : '!bg-darkBlue !text-white'
              }
              disabled={isFormCompleteValidation}
              onClick={handleOpenModals}
            />
          </div>
        </div>
      </div>

      <ConfirmTransaction form={form} isConfirm={isConfirm} setIsConfirm={setIsConfirm} />
    </form>
  );
};

export default CreateStream;
