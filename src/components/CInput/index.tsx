import React from 'react';
import Image from 'next/image';

import useCustomID from 'src/hooks/useCustomId';
import CLabel from '../CLabel';

import alertLogo from 'public/images/error.png';
import clearInputLogo from 'public/images/x.svg';

interface CInputProps {
  icon?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  details?: string;
  error?: boolean;
  errorMsg?: string;
  clearInput?: boolean;
  clearInputClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  paste?: boolean;
  clipboardText?: string;
  handlePaste?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
  border?: boolean;
  value?: string | number | any;
  disabled: boolean;
}

const CInput = ({
  icon,
  placeholder,
  className,
  label,
  details,
  error,
  errorMsg,
  clearInput,
  clearInputClick,
  onChange,
  paste,
  border,
  handlePaste,
  value,
  disabled,
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

        {error && alertLogo && (
          <div className="absolute bottom-3.5 right-3.5">
            <Image src={alertLogo} width={30} height={30} alt="alert" />
          </div>
        )}

        {paste && (
          <div
            className="bg-white text-midnightBlue text-sm px-[14px] py-[6px] rounded-lg absolute bottom-3 right-3.5 cursor-pointer transition hover:bg-[#E6E6EC]"
            onClick={handlePaste}
          >
            <span>Paste</span>
          </div>
        )}

        {!error && clearInput && (
          <div className="absolute bottom-3.5 right-3.5">
            <Image
              src={clearInputLogo}
              width={0}
              height={0}
              alt="clear"
              className="cursor-pointer"
              onClick={clearInputClick}
            />
          </div>
        )}

        <input
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`${icon ? 'px-12' : 'px-4'}
           self-stretch rounded-xl placeholder-mutedBlue text-midnightBlue text-base w-full h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none border
           ${border ? 'focus:border-darkBlue' : 'border-transparent'}  
           ${error && 'border !border-error'}
           ${disabled && 'cursor-not-allowed !select-none text-mutedBlue'}
          `}
          value={value}
          disabled={disabled}
          {...props}
        />

        <div className="h-[20px] absolute mt-[6px] ml-1">
          {error && errorMsg && (
            <span className="text-error text-sm">{errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CInput;
