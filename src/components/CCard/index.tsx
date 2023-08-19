import React from 'react';
import cn from 'classnames';

interface CardProps {
  color?: string;
  bgColor?: string;
  borderColor?: string;
  children?: JSX.Element | React.ReactNode;
  className: string;
}

const CCard = ({ children, bgColor, borderColor, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(className, 'rounded-[14px] border')}
      style={{ backgroundColor: bgColor, border: 'solid 1px' + borderColor }}
      {...props}
    >
      {children}
    </div>
  );
};

export default CCard;
