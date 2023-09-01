import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import CLabel from '../CLabel';
import { Wrapper } from './datePickerStyles';
import useCustomID from '../../hooks/useCustomId';
import calendarLogo from '../../../public/images/calendar.svg';

interface CDatePickerProps {
  label?: string;
  details?: string;
  onChange: (value: number) => void;
}

const CDatePicker = ({ label, details, onChange }: CDatePickerProps) => {
  const id = useCustomID('CDatePicker');
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: Date) => {
    setIsOpen(!isOpen);
    const timeStamp = value.getTime();
    setStartDate(value);
    onChange(timeStamp);

    if (!isDatePickerUsed) {
      setIsDatePickerUsed(true);
    }
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const CustomInput = forwardRef<HTMLInputElement>(({ value, onClick }, ref) => (
    <div className="relative w-[300px]">
      <button
        className="text-left rounded-[12px] h-14 px-[16px] outline-none focus:outline-gray-400 text-[18px] placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] w-full bg-neutral-100 "
        onClick={onClick}
        ref={ref}
      >
        {!isDatePickerUsed ? 'Choose date' : value}
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
            selected={startDate}
            onChange={handleChange}
            customInput={<CustomInput />}
            minDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            filterTime={filterPassedTime}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Wrapper>
      </div>
    </div>
  );
};
export default CDatePicker;
