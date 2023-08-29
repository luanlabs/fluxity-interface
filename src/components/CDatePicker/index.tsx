import React, { useState } from 'react';
import Image from 'next/image';

import Datepicker from 'tailwind-datepicker-react';
import CLabel from '../CLabel';
import getFormattedDate, { datePickerOptions } from './datePickerConfig';
import useCustomID from '../../hooks/useCustomId';
import calendarLogo from '../../../public/images/calendar.svg';

interface CDatePickerProp {
  label?: string;
  details?: string;
  onChange: (value: number) => void;
}

const CDatePicker = ({ label, details, onChange }: CDatePickerProp) => {
  const id = useCustomID('CDatePicker');
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);

  const handleChange = (selectedDate: Date) => {
    const timeStamp = selectedDate.getTime();
    setSelectedDate(timeStamp);
    setShow(false);
    onChange(timeStamp);
  };

  return (
    <div>
      <CLabel label={label} details={details} htmlFor={id} />
      <div>
        <div className="relative">
          <div className="absolute right-4 bottom-4">
            <Image src={calendarLogo} alt="calender" />
          </div>
          <input
            type="text"
            className="self-stretch rounded-[12px] h-[60px] px-[16px] text-[18px] placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] w-full bg-neutral-100 justify-start items-center"
            placeholder="Choose date"
            value={selectedDate === 0 ? 'Choose Date' : getFormattedDate(selectedDate)}
            onFocus={() => setShow(true)}
            readOnly
            id={id}
          />
        </div>
        <Datepicker
          options={datePickerOptions}
          onChange={handleChange}
          show={show}
          setShow={setShow}
          classNames=""
        ></Datepicker>
      </div>
    </div>
  );
};
export default CDatePicker;
