import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import buttonCustomStyles from './buttonCustomStyles';
import FluxityLogoButton from 'src/assets/FluxityLogoButton';

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
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fill?: string;
  onClick?: () => void;
  logo?: string;
}

const CButton = ({
  variant,
  color,
  onClick,
  className,
  type,
  disabled,
  content,
  fill,
  logo,
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
      {fill && (
        <div className="mr-[10px]">
          <FluxityLogoButton fill={fill} />
        </div>
      )}
      {logo && (
        <Image src={logo} width={25} height={25} alt="logo" className="mr-2" />
      )}
      {content}
    </button>
  );
};

export default CButton;
