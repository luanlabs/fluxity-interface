import { useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import cn from 'classnames';

import CInput from '../CInput';
import selectStyles from './selectStyles';
import flowRateOptions from 'src/constants/flowRates';
import { SelectItemType } from 'src/models';
import { forceInputNumber } from 'src/utils/forceInputNumber';

import arrowLogo from 'public/images/arrow.svg';

export type CInputRateValue = { amount: string; rateTime: SelectItemType };

interface CInputRate {
  placeholder: string;
  details?: string;
  label: string;
  className?: string;
  onChange: (values: CInputRateValue) => void;
  errorMsg?: string;
  error?: boolean;
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
}: CInputRate) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<SelectItemType>(flowRateOptions[2]);

  const handleInputChange = (e: any) => {
    onChange({
      amount: e.target.value,
      rateTime: selectValue,
    });

    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: SelectItemType) => {
    onChange({
      amount: inputValue,
      rateTime: e,
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
