import React from 'react';
import cn from 'classnames';

import CCard from '../CCard';

export type CPageCardResponsive = 'bordered' | 'borderless';
interface CPageCard {
  divider?: boolean;
  title?: JSX.Element | React.ReactNode;
  children: JSX.Element | React.ReactNode;
  className?: string;
  scroll?: boolean;
  childrenClassName?: string;
  borderStatus: CPageCardResponsive;
  dividerReponsiveClassName?: string;
}

const CPageCard = ({
  divider,
  title,
  children,
  className,
  scroll = false,
  childrenClassName,
  borderStatus,
  dividerReponsiveClassName,
  ...props
}: CPageCard) => {
  let dividerStyle = '';
  let padding = '';

  if (divider) {
    dividerStyle = 'border-b border-[rgba(5, 1, 66, 0.10)] mb-4 sm:w-[95%]';
    padding = 'pl-2';
  } else {
    dividerStyle = 'border-none mb-0';
    padding = 'p-0';
  }

  return (
    <CCard
      className={cn(
        `flex flex-col w-full h-full ${
          borderStatus === 'borderless' ? 'mobile:!border-none mobile:!rounded-none' : 'mt-1'
        }`,
        className,
      )}
      bgColor="#fff"
      borderColor="rgba(5, 1, 66, 0.10)"
      {...props}
    >
      {title && <div className="w-full font-medium">{title}</div>}
      {divider && <div className={cn(dividerStyle, dividerReponsiveClassName)} />}
      <div
        className={`${cn(padding, childrenClassName)} ${
          scroll && 'overflow-y-scroll h-full'
        } mobile:overflow-y-scroll mobile:overflow-x-hidden`}
      >
        {children}
      </div>
    </CCard>
  );
};

export default CPageCard;
