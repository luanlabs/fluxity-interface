import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface ButtonProps {
  color?: 'orange' | 'purple' | 'white' | 'gray' | 'blue' | 'blueWhite';
  content: string;
  kind: 'simple' | 'form';
  logo?: string;
}

const CButton = ({ color, content, kind, logo, ...props }: ButtonProps) => {
  let colorStyles = '';
  if (color === 'orange') {
    colorStyles = 'bg-mediumcoral h-[40px] text-[#fff]';
  } else if (color === 'purple') {
    colorStyles = 'bg-darklavender text-[#fff] h-[40px]';
  } else if (color === 'gray') {
    colorStyles = 'bg-lavenderblush border border-midnightblue text-midnightblue';
  } else if (color === 'white') {
    colorStyles = 'bg-[#fff] border border-midnightblue text-midnightblue';
  } else if (color === 'blue') {
    colorStyles = 'bg-[#4c36d8] text-[#fff]';
  } else {
    colorStyles = 'bg-[#fff] text-royalblue !rounded-[11px] h-[36px] !px-3';
  }

  const kindStyles =
    kind === 'simple'
      ? 'rounded-[30px] text-center text-[16px] px-6 h-[44px] flex flex-row justify-center items-center'
      : '!bg-midnightblue rounded-[12px] w-[329px] h-[56px] !text-[#fff] text-[16px] text-center flex justify-center items-center';

  return (
    <button className={cn(kindStyles, colorStyles)} {...props}>
      {logo && (
        <Image src={logo} width={25} height={25} alt="logo" className="mr-2" {...props} />
      )}
      {content}
    </button>
  );
};

export default CButton;
