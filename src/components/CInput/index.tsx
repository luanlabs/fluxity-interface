import React from 'react';
import Image from 'next/image';

import useCustomID from '../../hooks/useCustomId';
import CLabel from '../CLabel';

interface CInputProps {
  icon?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  details?: string;
}

const CInput = ({
  icon,
  placeholder,
  className,
  label,
  details,
  onChange,
  ...props
}: CInputProps) => {
  const id = useCustomID('Cinput');

  return (
    <div className={className}>
      <CLabel label={label} details={details} htmlFor={id} />

      <div className="relative w-full">
        {icon && (
          <div className="absolute bottom-4 left-3.5">
            <Image src={icon} width={22} height={22} alt="inputIcon" />
          </div>
        )}

        <input
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          className={` ${
            icon ? 'px-12' : 'px-[16px]'
          } self-stretch rounded-[12px] placeholder-[#7D7B9B] text-midnightblue text-[16px] w-full h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none`}
          {...props}
        />
      </div>
    </div>
  );
};

export default CInput;
