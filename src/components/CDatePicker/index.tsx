import React, { forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';
import DatePicker from 'react-datepicker';

import useCustomID from 'src/hooks/useCustomId';
import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';
import CBottomSheet from 'src/components/CBottomSheet';
import CButton from 'src/components/CButton';

import { Wrapper } from './datePickerStyles';

import 'react-datepicker/dist/react-datepicker.css';

interface CDatePickerProps {
  label?: string;
  onChange: (value: Date) => void;
  className?: string;
  minDate: Date;
  maxDate: Date;
  readonly?: boolean;
  tooltipTitle: string;
  tooltipDetails?: string;
  isFormReset?: boolean;
  setIsFormReset?: (_: boolean) => void;
  value: Date;
  isSticky?: boolean;
}

const CDatePicker = ({
  label,
  onChange,
  className,
  minDate,
  maxDate,
  readonly,
  tooltipDetails,
  tooltipTitle,
  value,
  isFormReset,
  setIsFormReset,
  isSticky,
}: CDatePickerProps) => {
  const id = useCustomID('CDatePicker');
  const [selectedDate, setSelectedDate] = useState(minDate || new Date());
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [enabledDatePicker, setEnabledDatePicker] = useState(false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  useEffect(() => {
    if (!value) {
      setIsDatePickerUsed(false);
      setIsToggleEnabled(false);
      setEnabledDatePicker(false);

      if (isFormReset && setIsFormReset) {
        if (!isToggleEnabled && !isDatePickerUsed && enabledDatePicker) {
          setIsToggleEnabled(true);
          setIsFormReset(false);
        } else {
          setIsFormReset(true);
          setIsToggleEnabled(false);
        }
      }
    } else {
      setIsToggleEnabled(true);
      setEnabledDatePicker(true);
    }
    if (setIsFormReset) {
      setIsFormReset(false);
    }
  }, [value, isToggleEnabled, isFormReset, setIsFormReset]);

  const handleToggleStatus = (value: boolean) => {
    setEnabledDatePicker(value);
  };

  const handleChange = (value: Date) => {
    setIsOpenDatePicker(!isOpenDatePicker);
    setSelectedDate(value);
    onChange(value);

    if (!isDatePickerUsed) {
      setIsDatePickerUsed(true);
    }
  };

  const filterPassedTime = (time: Date) => {
    if (!maxDate) {
      return minDate.getTime() < time.getTime();
    }
    return minDate.getTime() < time.getTime() && maxDate.getTime() > time.getTime();
  };

  const handleOpenSheet = () => {
    if (enabledDatePicker || readonly) {
      setIsOpenSheet(true);
    }
  };

  const handleCloseSheetClick = () => {
    setIsDatePickerUsed(false);
    setIsOpenSheet(false);
  };

  const handleConfirmSheetClick = () => {
    setIsOpenSheet(false);
  };
  const CustomInput = forwardRef<HTMLInputElement>(({ value, onClick }, ref) => (
    <div className={cn('relative w-full', className)} onClick={handleOpenSheet}>
      <button
        className="text-left rounded-xl h-14 px-4 outline-none text-lg placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] !w-full bg-neutral-100"
        onClick={onClick}
        ref={ref}
      >
        <span className={`${!isDatePickerUsed ? '' : 'text-sm text-midnightBlue'} `}>
          <span className={!enabledDatePicker && !readonly ? 'text-[#a2a1b7]' : ''}>
            {!isDatePickerUsed ? 'Choose date' : value}
          </span>
        </span>
        <div
          className={`
        absolute
        right-4
        bottom-[10px]
        w-[25px]
        h-[30px]
        ${enabledDatePicker || readonly ? 'bg-calendar' : 'bg-disableCalendar'}
        bg-no-repeat
        bg-right
        `}
        />
      </button>
    </div>
  ));

  CustomInput.displayName = 'datepickerCustomInput';

  return (
    <div>
      <div className="flex items-center w-full">
        <CLabel
          label={label}
          tooltipDetails={tooltipDetails}
          tooltipTitle={tooltipTitle}
          htmlFor={id}
          className={`mr-[10px] ${enabledDatePicker || readonly ? '' : '!text-[#817fa0]'}`}
          disabled={!enabledDatePicker && !readonly ? true : false}
        />
        <div className="mb-1.5">
          <CToggle
            onChange={handleToggleStatus}
            readonly={readonly}
            isToggleEnabled={isToggleEnabled}
          />
        </div>
      </div>

      <div className="w-full">
        <Wrapper>
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            customInput={<CustomInput />}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            filterTime={filterPassedTime}
            timeCaption="Time"
            dateFormat="MMM dd, yyyy HH:mm"
            disabled={!enabledDatePicker && !readonly}
            calendarClassName="mobile:!hidden"
          />
        </Wrapper>

        <CBottomSheet
          contentClass="justify-center items-center"
          isSticky={isSticky}
          isModalOpen={isOpenSheet}
          setIsModalOpen={setIsOpenSheet}
          className="desktop:!hidden"
        >
          <Wrapper>
            <DatePicker
              selected={selectedDate}
              onChange={handleChange}
              customInput={<CustomInput />}
              minDate={minDate}
              maxDate={maxDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              filterTime={filterPassedTime}
              timeCaption="Time"
              dateFormat="MMM dd, yyyy HH:mm"
              disabled={!enabledDatePicker && !readonly}
              inline
            />
          </Wrapper>
          <div className=" w-full flex justify-end px-4 py-5 gap-2">
            <CButton
              variant="simple"
              color="blueWhite"
              content="Close"
              className="rounded-xl !py-5 !h-[60px] text-slate-700"
              onClick={handleCloseSheetClick}
            />
            <CButton
              variant="simple"
              color="blue"
              content="Confirm"
              className="rounded-xl !py-5 !h-[60px]"
              onClick={handleConfirmSheetClick}
            />
          </div>
        </CBottomSheet>
      </div>
    </div>
  );
};
export default CDatePicker;
