'use client';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';

import CStreamingModelContainer from 'src/containers/CStreamingModelContainer';
import CInput from 'src/components/CInput';
import CInputRate from 'src/components/CInputRate';
import CSelect from 'src/components/CSelect';
import CDatePicker from 'src/components/CDatePicker';
import RightAside from '../RightAside';
import CPageCard from 'src/components/CPageCard';

import searchLogo from 'public/images/search.svg';

type FormValues = {
  address: string;
  rate: string;
  rateTime: string;
  token: string;
  startDate: Date;
  endDate: Date;
  cliffDate: Date;
};

const CreateStream = () => {
  const form = useForm<FormValues>();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = form;

  watch(['startDate', 'endDate', 'cliffDate', 'rateTime']);

  const onSubmit = (data: FormValues) => {
    console.log('a', data);
  };

  const CreateStreamTitle = (
    <div className="w-full flex justify-between items-center  pb-4">
      <h1 className="text-[24px] text-midnightblue pl-2 mt-2">Create Stream</h1>
    </div>
  );

  const handleFlowRateSelect = (value: any) => {
    setValue('rateTime', `${value.value}`);
  };

  const addressValidation = (value: any) => {
    if (value.length <= 16) {
      return 'must be more than 16 characters';
    } else {
      return true;
    }
  };

  return (
    <div className="flex w-full">
      <CPageCard
        title={CreateStreamTitle}
        divider
        className="w-[580px]
        pl-[30px] pr-[18px] py-[15px]"
      >
        <div className="divide-[#CFCFDB] w-full">
          <form method="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <CStreamingModelContainer
                label="Streaming model"
                details="Streaming model"
              />
            </div>
            <hr className="my-[24px]" />
            <div className="mb-[24px]">
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: true, validate: addressValidation }}
                render={({ field }) => (
                  <CInput
                    placeholder="Address or Name in the Address Book"
                    label="Receiver wallet address"
                    details="Address or Name in the Address Book"
                    icon={searchLogo}
                    {...field}
                    error={errors.address}
                  />
                )}
              />
            </div>
            <div className="flex gap-2 items-center justify-center mb-[24px]">
              <Controller
                name="token"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CSelect
                    placeholder="Select token"
                    label="Token"
                    className="basis-3/5"
                    {...field}
                  />
                )}
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

            <hr className="mb-[24px]" />

            <div className="flex gap-2">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    {...field}
                    className="w-[220px]"
                    label="Start date (optional)"
                    details="Startdate"
                    minDate={new Date()}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    {...field}
                    className="w-[220px]"
                    label="End date"
                    details="Enddate"
                    minDate={
                      getValues('startDate')
                        ? new Date(getValues('startDate'))
                        : new Date()
                    }
                  />
                )}
              />
            </div>
            <div className="mt-[24px]">
              <Controller
                name="cliffDate"
                control={control}
                render={({ field }) => (
                  <CDatePicker
                    className="w-[220px]"
                    label="Cliff date (optional)"
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
            </div>
            <button>submit</button>
          </form>
        </div>
      </CPageCard>

      <div className="ml-[24px]">
        <RightAside />
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default CreateStream;
