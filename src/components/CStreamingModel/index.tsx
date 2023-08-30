import React from 'react';
import Image from 'next/image';

import CCard from '../CCard';
import useStreamModel from './useStreamModel';

export type Model = 'linear' | 'exponential';

interface StreamingModel {
  model: Model;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CStreamingModel = ({ model, isSelected, onClick, ...props }: StreamingModel) => {
  const { logo, title, description } = useStreamModel(model);

  return (
    <CCard
      className={`flex justify-center items-center w-full h-[64px] px-[10px] py-[8px] cursor-pointer bg-[#fff] ${
        isSelected ? 'bg-powderblue' : 'bg-[#fff]'
      } ease-in duration-100`}
      borderColor="#000"
      onClick={onClick}
      {...props}
    >
      <div className="h-full flex items-center">
        <Image src={logo} alt={title} width={67} height={67} />
      </div>
      <div className="text-midnightblue w-full ml-[9px] flex flex-col justify-center items-start">
        <span className="text-[16px]">{title}</span>
        <p className="text-[10px] leading-[12px] w-[90%]">{description}</p>
      </div>
    </CCard>
  );
};

export default CStreamingModel;
