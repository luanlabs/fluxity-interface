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
  onClick: () => void;
}

const CButton = ({
  kind,
  logo,
  color,
  onClick,
  content,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonCustomStyles(kind, color)}
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
