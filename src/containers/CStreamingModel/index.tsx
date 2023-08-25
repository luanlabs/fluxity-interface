import React, { useState } from 'react';
import Image from 'next/image';

import CStreamingModel from 'src/components/CStreamingModel';

import summary from '../../../public/images/summary.svg';

const InputGroup = ({ ...props }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModelSelect = (model: string) => {
    if (selectedModel === model) {
      setSelectedModel(null);
    } else {
      setSelectedModel(model);
    }
  };
  return (
    <div className="w-[532px] flex flex-col">
      <div className="flex items-start">
        <label
          className="text-slate-900 text-lg font-normal leading-[18.78px] mb-[16px]"
          {...props}
        >
          Streaming Model
        </label>
        <Image src={summary} alt="search" className="ml-2" />
      </div>
      <div className="flex gap-2">
        <CStreamingModel
          isSelected={selectedModel === 'linear'}
          model="linear"
          onClick={() => handleModelSelect('linear')}
        />
        <CStreamingModel
          isSelected={selectedModel === 'exponential'}
          model="exponential"
          onClick={() => handleModelSelect('exponential')}
        />
      </div>
    </div>
  );
};

export default InputGroup;
