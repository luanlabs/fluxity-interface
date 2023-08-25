import React from 'react';
import Image from 'next/image';

import useCustomID from '../../hooks/useCustomId';

interface CInputProps {
  icon?: string;
  labelDetail?: string;
  labelText?: string;
  placeholderText?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
}

const CInput = ({
  icon,
  labelDetail,
  placeholderText,
  labelText,
  className,
  title,
  onChange,
  ...props
}: CInputProps) => {
  const id = useCustomID('Cinput');

  return (
    <div className={className}>
      <div className="flex items-start">
        <label
          htmlFor={id}
          className="text-slate-900 text-lg font-normal leading-[18.78px] mb-[8px]"
          {...props}
        >
          {labelText}
        </label>
        {labelDetail && (
          <Image src={labelDetail} alt="search" className="ml-2" title={title} />
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          id={id}
          onChange={onChange}
          placeholder={placeholderText}
          className={` ${
            icon ? 'px-12' : 'px-[16px]'
          } self-stretch rounded-[12px] placeholder-[#7D7B9B] text-[#7D7B9B] text-[16px] leading-[18.78px] w-full h-14 p-4 bg-neutral-100 justify-start items-center inline-flex`}
          {...props}
        />
        {icon && (
          <div className="absolute bottom-4 left-3.5">
            <Image src={icon} width={22} height={22} alt="search" {...props} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CInput;
