import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import cn from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';

import CLabel from '../CLabel';
import { Wrapper } from './datePickerStyles';
import useCustomID from '../../hooks/useCustomId';
import calendarLogo from '../../../public/images/calendar.svg';

interface CDatePickerProps {
  label?: string;
  details?: string;
  onChange?: (value: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CDatePicker = ({
  label,
  details,
  onChange,
  className,
  minDate,
  maxDate,
}: CDatePickerProps) => {
  const id = useCustomID('CDatePicker');
  const [selectedDate, setSelectedDate] = useState(minDate || new Date());
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: Date) => {
    setIsOpen(!isOpen);
    setSelectedDate(value);
    onChange(value);

    if (!isDatePickerUsed) {
      setIsDatePickerUsed(true);
    }
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = minDate || new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const CustomInput = forwardRef<HTMLInputElement>(({ value, onClick }, ref) => (
    <div className={cn('relative', className)}>
      <button
        className="text-left rounded-[12px] h-14 px-[16px] outline-none focus:outline-gray-400 text-[18px] placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] w-full bg-neutral-100"
        onClick={onClick}
        ref={ref}
      >
        <span className={`${!isDatePickerUsed ? '' : 'text-[14px]'} `}>
          {!isDatePickerUsed ? 'Choose date' : value}
        </span>
      </button>
      <div className="absolute right-4 bottom-4">
        <Image src={calendarLogo} alt="calender" width={0} height={0} />
      </div>
    </div>
  ));

  CustomInput.displayName = 'datepickerCustomInput';

  return (
    <div>
      <CLabel label={label} details={details} htmlFor={id} />

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
            dateFormat="MMMM dd, yyyy HH:mm"
          />
        </Wrapper>
      </div>
    </div>
  );
};
export default CDatePicker;
