import React from 'react';
import cn from 'classnames';

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
      {content}
    </button>
  );
};

export default CButton;
