import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import buttonCustomStyles from './buttonCustomStyles';

export type CButtonVariantType = 'simple' | 'form';
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
  variant: CButtonVariantType;
  logo?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}

const CButton = ({
  variant,
  logo,
  color,
  onClick,
  className,
  type,
  disabled,
  content,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonCustomStyles(variant, color), className)}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      {logo && (
        <Image
          src={logo}
          width={25}
          height={25}
          alt="logo"
          className="mr-2"
          {...props}
        />
      )}
      {content}
    </button>
  );
};

export default CButton;
