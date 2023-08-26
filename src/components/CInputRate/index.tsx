import Select from 'react-select';
import Image from 'next/image';

import CInput from '../CInput';
import selectStyles from './selectStyles';
import flowRateOptions from '../../constants/flowRates';
import { ReactSelectOnChangeType } from 'src/models';

import arrowLogo from '../../../public/images/arrow.svg';

interface CInputRate {
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectOnChange: ReactSelectOnChangeType;
  placeHolder: string;
  details?: string;
  label: string;
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
  placeHolder,
  details,
  label,
  ...props
}: CInputRate) => {
  return (
    <div className="w-[306px] relative">
      <CInput
        placeholder={placeHolder}
        label={label}
        details={details}
        className="mb-8"
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
