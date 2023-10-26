import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import CCard from '../CCard';
import useStreamModel from './useStreamModel';

export type Model = 'linear' | 'exponential';

interface StreamingModel {
  model: Model;
  className?: string;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CStreamingModel = ({
  model,
  isSelected,
  className,
  onClick,
  disabled,
  ...props
}: StreamingModel) => {
  const { logo, title, description } = useStreamModel(model);

  return (
    <CCard
      className={cn(
        `flex justify-center items-center w-full h-16 px-[10px] py-2 cursor-pointer bg-white select-none ${
          isSelected ? '!bg-[#E4F6F9]' : 'bg-white'
        } 
      ease-in duration-100`,
        className,
        disabled && ' opacity-[35%]',
      )}
      borderColor="#000"
      onClick={onClick}
      {...props}
    >
      <div className="h-full flex items-center">
        <Image src={logo} alt={title} width={67} height={67} />
      </div>
      <div className="text-midnightBlue w-full ml-[9px] flex flex-col justify-center items-start">
        <span className="text-base">{title}</span>
        <p className="text-[10px] leading-3 w-[90%]">{description}</p>
      </div>
    </CCard>
  );
};

export default CStreamingModel;
