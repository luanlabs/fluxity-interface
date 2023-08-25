import React from 'react';
import Image from 'next/image';
import Select, { components } from 'react-select';

import useCustomID from '../../hooks/useCustomId';
import selectCustomStyle from './SelectCustomStyle';

import arrowLogo from '../../../public/images/arrow.svg';

interface CSelectProps {
  placeholder: string;
  labelText: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const options = [
  { value: 'xlm', label: 'XLM', icon: 'xlm.png' },
  { value: 'xlm2', label: 'XLM2', icon: 'xlm.png' },
];

const Option = (props: any) => (
  <components.Option {...props}>
    <Image
      src={require('../../../public/images/assets/' + props.data.icon)}
      width={30}
      height={20}
      alt={props.data.label}
      className="mr-4"
    />
    {props.data.label}
  </components.Option>
);

const Control = ({ ...props }) => {
  return <components.Control {...props}></components.Control>;
};

const DropdownIndicator = () => {
  return (
    <div>
      <Image src={arrowLogo} alt="arrow" />
    </div>
  );
};

const CSelect = ({
  labelText,
  placeholder,
  className,
  onChange,
  ...props
}: CSelectProps) => {
  const id = useCustomID('CSelect');

  return (
    <div className={className}>
      <div className="w-full">
        <div className="flex items-start">
          <label
            htmlFor={id}
            className="text-midnightblue text-lg ml-1 font-normal leading-[18.78px] mb-[8px]"
            {...props}
          >
            {labelText}
          </label>
        </div>
        <Select
          options={options}
          components={{ Option, DropdownIndicator, Control }}
          styles={selectCustomStyle()}
          placeholder={placeholder}
          isSearchable={false}
          id={id}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default CSelect;
