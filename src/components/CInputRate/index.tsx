import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import Select from 'react-select';

import { RateValue } from 'src/models';
import flowRateOptions from 'src/constants/rates';
import { forceInputNumber } from 'src/utils/forceInputNumber';

import arrowLogo from 'public/images/arrow.svg';

import CInput from '../CInput';
import selectStyles from './selectStyles';

export type CInputRateValue = { amount: string; rate: RateValue };

interface CInputRateProps {
  placeholder: string;
  details?: string;
  label: string;
  className?: string;
  errorMsg?: string;
  error?: boolean;
  onChange: (values: CInputRateValue) => void;
}

const DropdownIndicator = () => {
  return (
    <div className="mr-4">
      <Image src={arrowLogo} alt="arrow" />
    </div>
  );
};

const CInputRate = ({
  placeholder,
  details,
  label,
  className,
  onChange,
  errorMsg,
  error,
  ...props
}: CInputRateProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<RateValue>(flowRateOptions[2]);

  const handleInputChange = (e: any) => {
    onChange({
      amount: e.target.value,
      rate: selectValue,
    });

    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: RateValue) => {
    onChange({
      amount: inputValue,
      rate: e,
    });

    setSelectValue(e);
  };

  const handleOnPaste = (e) => {
    let paste = (e.clipboardData || window.clipboardData).getData('text');

    if (!paste.match(/^[0-9]*\.?[0-9]*$/)) {
      e.preventDefault();
    }
    if (e.target.value.includes('.') && paste.includes('.')) {
      e.preventDefault();
    }
  };

  return (
    <div className={cn('w-full relative', className)}>
      <CInput
        type="text"
        placeholder={placeholder}
        label={label}
        details={details}
        onKeyPress={forceInputNumber}
        {...props}
        value={inputValue}
        onChange={handleInputChange}
        errorMsg={errorMsg}
        error={error}
        onPaste={handleOnPaste}
        maxLength="15"
      />

      <Select
        options={flowRateOptions}
        components={{ DropdownIndicator }}
        styles={selectStyles}
        isSearchable={false}
        defaultValue={flowRateOptions[2]}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default CInputRate;
