import Select from 'react-select';
import Image from 'next/image';
import cn from 'classnames';

import CInput from '../CInput';
import selectStyles from './selectStyles';
import flowRateOptions from '../../constants/flowRates';
import { ReactSelectOnChangeType } from 'src/models';

import arrowLogo from '../../../public/images/arrow.svg';

interface CInputRate {
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectOnChange?: ReactSelectOnChangeType;
  placeholder: string;
  details?: string;
  label: string;
  className?: string;
}

const DropdownIndicator = () => {
  return (
    <div className="mr-4">
      <Image src={arrowLogo} alt="arrow" />
    </div>
  );
};

const CInputRate = ({
  inputOnChange,
  selectOnChange,
  placeholder,
  details,
  label,
  className,
  ...props
}: CInputRate) => {
  return (
    <div className={cn('w-full relative', className)}>
      <CInput
        placeholder={placeholder}
        label={label}
        details={details}
        onChange={inputOnChange}
        {...props}
      />

      <Select
        options={flowRateOptions}
        components={{ DropdownIndicator }}
        styles={selectStyles}
        isSearchable={false}
        defaultValue={flowRateOptions[4]}
        onChange={selectOnChange}
      />
    </div>
  );
};

export default CInputRate;
