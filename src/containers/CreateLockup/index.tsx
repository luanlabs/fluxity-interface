'use client';

import cn from 'classnames';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import CButton from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import { INFINITY_DATE } from 'src/constants/dates';
import { useAppSelector } from 'src/hooks/useRedux';
import CDatePicker from 'src/components/CDatePicker';
import SummaryContainer from 'src/containers/Summary';
import { Model } from 'src/components/CStreamingModel';
import CBottomSheet from 'src/components/CBottomSheet';
import { ISelectToken, OperationType } from 'src/models';
import tooltipDetails from 'src/constants/tooltipDetails';
import SelectTokenContainer from 'src/containers/SelectToken';
import ConfirmTransaction from 'src/containers/ConfirmTransaction';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import CInputRate, { CInputRateValue } from 'src/components/CInputRate';
import WalletAddressContainer from 'src/containers/WalletAddressContainer';
import CStreamingModelContainer from 'src/containers/CStreamingModelContainer';
import CancellableLockup, { ToggleStatus } from 'src/containers/CancellableLockup';

import validateForm from './validateForm';

export interface FormValues {
  address: string;
  rate: CInputRateValue;
  token: ISelectToken;
  startDate: Date;
  endDate: Date;
  cliffDate: Date;
  streamingModel?: Model;
  isCancellable: ToggleStatus;
}

interface lockupProps {
  operationType: OperationType;
}

const CreateLockup = ({ operationType }: lockupProps) => {
  const [isFormReset, setIsFormReset] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const { address } = useAppSelector((state) => state.user);
  const userAssets = useAppSelector((state) => state.user?.info?.balances);
  const xlmAsset = userAssets?.filter((asset) => asset.asset_type === 'native')[0];

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: (formValues) =>
      validateForm(formValues, setIsFormValidated, address, {
        asset_type: xlmAsset?.asset_type,
        balance: xlmAsset?.balance,
        buyingLiabilities: xlmAsset?.buying_liabilities,
        sellingLiabilities: xlmAsset?.selling_liabilities,
      }),
    defaultValues: {
      ...(operationType === 'stream' && { streamingModel: 'linear' }),
      isCancellable: 'OFF',
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

  const startDate = getValues('startDate') || new Date();
  const endDate = getValues('endDate') && getValues('endDate');
  const cliffDate = getValues('cliffDate') && getValues('cliffDate');

  const onSubmit = (data: FormValues) => {};

  const resetFields = () => {
    if (!isFormReset) {
      setIsFormReset(true);
    }
    form.reset();
  };

  const handleOpenModals = () => {
    setIsConfirmClicked(true);
    setIsOpenSheet(false);
  };

  const handleMobileOpenModals = () => {
    setIsOpenSheet(true);
  };

  const isFormCompleteValidation = !isValid || isValidating || !isFormValidated || !address;

  const operation = capitalizeFirstLetter(operationType);
  const lockup = operationType === 'stream' ? tooltipDetails.createStream : tooltipDetails.vesting;

  const CreateStreamTitle = (
    <h1 className="text-[24px] text-midnightBlue pl-4 mt-1 mb-1">Create {operation}</h1>
  );

  return (
    <form method="" onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
      <div className="flex w-full h-full">
        <CPageCard
          title={CreateStreamTitle}
          divider
          className="w-full pl-[30px] pr-[18px] py-[15px] sm:pr-4 sm:pl-2 mobile:pb-3"
          scroll
          borderStatus="borderless"
        >
          <div className="w-full">
            {operationType === 'stream' && (
              <div className="w-full">
                <Controller
                  name="streamingModel"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <CStreamingModelContainer
                        label="Streaming model"
                        tooltipTitle="Streaming model"
                        tooltipDetails={tooltipDetails.createStream.streamingModel}
                        {...field}
                      />
                    </div>
                  )}
                />
                <hr className="my-6" />
              </div>
            )}

            <div className="mb-6">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <div>
                    <WalletAddressContainer
                      clearInputClick={() => resetField('address')}
                      tooltipTitle="Recipient wallet address"
                      tooltipDetails={lockup.walletAddress}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex gap-2 md:gap-6 w-full md:items-start sm:flex-col md:flex-col sm:items-start items-center justify-center">
              <Controller
                name="token"
                control={control}
                render={({ field }) => (
                  <SelectTokenContainer
                    xlmAsset={{
                      asset_type: xlmAsset?.asset_type,
                      balance: xlmAsset?.balance,
                    }}
                    className="desktop:w-full mobile:w-full fix-box:w-[90%]"
                    {...field}
                  />
                )}
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
                      tooltipDetails={lockup.flowRate}
                      className="basis-4/5 sm:!basis-0 md:basis-0 sm:mt-4 mobile:w-full "
                      errorMsg={errors.rate && errors.rate.message}
                      error={errors.rate?.message ? true : false}
                      isFormReset={isFormReset}
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
                  <CancellableLockup
                    tooltipDetails={lockup.cancellableStream}
                    tooltipTitle={`Cancellable ${operationType}`}
                    operationType={operationType}
                    {...field}
                  />
                )}
              />
            </div>

            <hr className="my-6 sm:hidden" />

            <div className="mb-6 sm:mb-3 w-full">
              <Controller
                name="cliffDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    className="!w-[236px] sm:w-[340px] mobile:!w-full"
                    label="Cliff date"
                    tooltipTitle="Cliff Date"
                    tooltipDetails={lockup.cliffDate}
                    minDate={startDate}
                    maxDate={endDate}
                    isFormReset={isFormReset}
                    setIsFormReset={setIsFormReset}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex w-full sm:flex-col lowTablet:flex-row sm:gap-4 gap-2 fix-box:flex-col">
              <div className="mobile:w-full">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <CDatePicker
                      {...field}
                      className="desktop:!w-[236px] mobile:!w-full"
                      label="Start date"
                      tooltipTitle="Start Date"
                      tooltipDetails={lockup.startDate}
                      minDate={startDate}
                      maxDate={endDate}
                      isFormReset={isFormReset}
                      setIsFormReset={setIsFormReset}
                    />
                  )}
                />
              </div>
              <div className="mobile:w-full">
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <CDatePicker
                      {...field}
                      className="desktop:!w-[236px] mobile:!w-full md:!w-full"
                      label="End date"
                      tooltipTitle="End Date"
                      tooltipDetails={lockup.endDate}
                      minDate={cliffDate ? cliffDate : startDate}
                      maxDate={INFINITY_DATE}
                      readonly
                    />
                  )}
                />
              </div>
            </div>

            <CButton
              type="submit"
              variant="form"
              content={`Create ${operation}`}
              svgLogo="fluxityLogo"
              fill={isFormCompleteValidation ? '#050142' : '#fff'}
              className={cn(
                isFormCompleteValidation
                  ? '!bg-[#E6E6EC] !text-[#050142]'
                  : '!bg-darkBlue !text-white',
                'xl:hidden xxl:hidden 2xl:hidden 3xl:hidden md2:hidden lg:hidden mt-12 sm:mt-4 md:mt-5 w-3/4 mobile:w-full m-auto',
              )}
              disabled={isFormCompleteValidation}
              onClick={handleMobileOpenModals}
            />
          </div>
        </CPageCard>
        <div className="relative ml-6 md2:ml-3 md2:mr-3 sm:hidden md:hidden md2:block">
          <div>
            <SummaryContainer
              form={form}
              isFormValidated={isFormValidated}
              xlmAsset={{
                asset_type: xlmAsset?.asset_type,
                balance: xlmAsset?.balance,
                buyingLiabilities: xlmAsset?.buying_liabilities,
                sellingLiabilities: xlmAsset?.selling_liabilities,
              }}
              address={address}
              operationType={operationType}
            />
            <div className="desktop:hidden w-full">
              <CBottomSheet
                contentClass="justify-center items-center w-full pb-4 px-4 "
                isModalOpen={isOpenSheet}
                setIsModalOpen={setIsOpenSheet}
                className="desktop:!hidden"
              >
                <SummaryContainer
                  form={form}
                  isFormValidated={isFormValidated}
                  xlmAsset={{
                    asset_type: xlmAsset?.asset_type,
                    balance: xlmAsset?.balance,
                    buyingLiabilities: xlmAsset?.buying_liabilities,
                    sellingLiabilities: xlmAsset?.selling_liabilities,
                  }}
                  address={address}
                  operationType={operationType}
                  className="w-full"
                />
                <div className="bg-lightGrayishBlue w-full h-[2px] mt-2 mb-4"></div>
                <CButton
                  type="submit"
                  variant="form"
                  content={`Create ${operation}`}
                  svgLogo="fluxityLogo"
                  fill={isFormCompleteValidation ? '#050142' : '#fff'}
                  className={cn(
                    isFormCompleteValidation
                      ? '!bg-[#E6E6EC] !text-[#050142]'
                      : '!bg-darkBlue !text-white',
                    'w-full h-16 text-lg',
                  )}
                  disabled={isFormCompleteValidation}
                  onClick={handleOpenModals}
                />
              </CBottomSheet>
            </div>
            <CButton
              type="submit"
              variant="form"
              content={`Create ${operation}`}
              svgLogo="fluxityLogo"
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

      <ConfirmTransaction
        form={form}
        isConfirmClicked={isConfirmClicked}
        setIsConfirmClicked={setIsConfirmClicked}
        resetFields={resetFields}
        operationType={operationType}
      />
    </form>
  );
};

export default CreateLockup;
