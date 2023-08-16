import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface ButtonProps {
  color?: 'orange' | 'purple' | 'white' | 'gray' | 'blue';
  content: string;
  kind: 'simple' | 'form';
  logo?: string;
}

const CButton = ({ color, content, kind, logo }: ButtonProps) => {
  let colorStyles = '';
  if (color === 'orange') {
    colorStyles = 'bg-[#cd5a41] h-[40px] text-[#fff]';
  } else if (color === 'purple') {
    colorStyles = 'bg-[#852fda] h-[40px]';
  } else if (color === 'gray') {
    colorStyles = 'bg-[#F0EFFF] border border-[#050142] text-[#050142]';
  } else if (color === 'white') {
    colorStyles = 'bg-[#fff] border border-[#050142] text-[#333]';
  } else {
    colorStyles = 'bg-[#4c36d8]';
  }

  const kindStyles =
    kind === 'simple'
      ? 'rounded-[30px] text-[#fff] text-center text-[16px] px-6 h-[44px] flex flex-row justify-center items-center'
      : '!bg-[#050142] rounded-[12px] w-[329px] h-[56px] text-[#fff] text-[16px] text-center flex justify-center items-center';

  return (
    <button className={cn(kindStyles, colorStyles)}>
      {logo && <Image src={logo} width={25} height={25} alt="logo" className="mr-2" />}
      {content}
    </button>
  );
};

export default CButton;
