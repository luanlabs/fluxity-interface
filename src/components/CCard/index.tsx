import React from 'react';

interface CardProps {
  color?: string;
  bgColor?: string;
  borderColor?: string;
  children: JSX.Element | React.ReactNode;
  className: string;
}

const CCard = ({ children, bgColor, borderColor }: CardProps) => {
  return <div style={{ backgroundColor: bgColor, border: borderColor }}>{children}</div>;
};

export default CCard;
