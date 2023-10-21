import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import buttonCustomStyles from './buttonCustomStyles';

export type CButtonKindType = 'simple' | 'form';
export type CButtonColorType =
  | 'orange'
  | 'purple'
  | 'white'
  | 'gray'
  | 'blue'
  | 'blueWhite';

interface ButtonProps {
  color?: CButtonColorType;
  content: string;
  kind: CButtonKindType;
  logo?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className: string;
}

const CButton = ({
  color,
  content,
  kind,
  logo,
  disabled,
  type,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonCustomStyles(kind, color), className)}
      disabled={disabled}
      {...props}
    >
      {logo && (
        <Image src={logo} width={25} height={25} alt="logo" className="mr-2" {...props} />
      )}
      {content}
    </button>
  );
};

export default CButton;
