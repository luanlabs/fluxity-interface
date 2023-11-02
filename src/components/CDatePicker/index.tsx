import React, { forwardRef, useState } from 'react';

import cn from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import useCustomID from 'src/hooks/useCustomId';

import CLabel from '../CLabel';
import { Wrapper } from './datePickerStyles';

import CToggle from '../CToggle';

interface CDatePickerProps {
  label?: string;
  details?: string;
  onChange: (value: Date) => void;
  className?: string;
  minDate: Date;
  maxDate: Date;
  readonly?: boolean;
}

const CDatePicker = ({
  label,
  details,
  onChange,
  className,
  minDate,
  maxDate,
  readonly,
}: CDatePickerProps) => {
  const id = useCustomID('CDatePicker');
  const [selectedDate, setSelectedDate] = useState(minDate || new Date());
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const handleChange = (value: Date) => {
    setIsOpen(!isOpen);
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

  const handleToggleStatus = (value: boolean) => {
    setEnabled(value);
  };

  const CustomInput = forwardRef<HTMLInputElement>(({ value, onClick }, ref) => (
    <div className={cn('relative', className)}>
      <button
        className="text-left rounded-xl h-14 px-4 outline-none text-lg placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] w-full bg-neutral-100"
        onClick={onClick}
        ref={ref}
      >
        <span className={`${!isDatePickerUsed ? '' : 'text-sm text-midnightBlue'} `}>
          {!isDatePickerUsed ? 'Choose date' : value}
        </span>
        <div
          className={`
        absolute
        right-4
        bottom-[10px]
        w-[25px]
        h-[30px]
        ${enabled || readonly ? 'bg-calendar' : 'bg-disableCalendar'}
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
      <div className="flex items-center">
        <CLabel
          label={label}
          details={details}
          htmlFor={id}
          className={`mr-[10px] ${enabled || readonly ? '' : 'text-[#817fa0]'}`}
          detailslogoDisabled={!enabled && !readonly ? true : false}
        />
        <div>
          <CToggle onChange={handleToggleStatus} readonly={readonly} />
        </div>
      </div>

      <div>
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
            disabled={!enabled && !readonly}
          />
        </Wrapper>
      </div>
    </div>
  );
};
export default CDatePicker;
