import react from 'react';
import Select from 'react-select';
import Image from 'next/image';

import CInput from '../CInput';
import selectStyles from './selectStyles';

import arrowLogo from '../../../public/images/arrow.svg';
import summary from '../../../public/images/summary.svg';

interface CInputRate {
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const options = [
  { value: 'minutes', label: 'Minutes' },
  { value: 'hour', label: 'Hour' },
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

const DropdownIndicator = () => {
  return (
    <div className="mr-4">
      <Image src={arrowLogo} alt="arrow" />
    </div>
  );
};

const CInputRate = ({ inputOnChange, selectOnChange, ...props }: CInputRate) => {
  return (
    <div className="w-[306px] relative">
      <CInput
        placeholderText="0.0"
        labelText="Flow rate"
        labelDetail={summary}
        className="mb-8"
        title="Flowrate"
        onChange={inputOnChange}
        {...props}
      />

      <Select
        options={options}
        components={{ DropdownIndicator }}
        styles={selectStyles}
        placeholder="Month"
        isSearchable={false}
        onChange={selectOnChange}
        {...props}
      />
    </div>
  );
};

export default CInputRate;
