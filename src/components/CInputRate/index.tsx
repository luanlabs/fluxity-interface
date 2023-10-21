import Select from 'react-select';
import Image from 'next/image';
import cn from 'classnames';
import { useState } from 'react';

import CInput from '../CInput';
import selectStyles from './selectStyles';
import flowRateOptions from '../../constants/flowRates';
import { SelectItemType } from 'src/models';

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

const inpNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = typeof e.which === 'undefined' ? e.keyCode : e.which;
  const charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9]*\.?[0-9]*$/)) e.preventDefault();
};

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

  return (
    <div className={cn('w-full relative', className)}>
      <CInput
        type="number"
        placeholder={placeholder}
        label={label}
        details={details}
        onKeyPress={inpNum}
        {...props}
        value={inputValue}
        onChange={handleInputChange}
        errorMsg={errorMsg}
        error={error}
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
