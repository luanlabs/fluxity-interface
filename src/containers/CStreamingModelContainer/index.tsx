import React, { useState } from 'react';

import CStreamingModel from 'src/components/CStreamingModel';
import CLabel from 'src/components/CLabel';

interface CStreamingModelContainer {
  label?: string;
  details?: string;
}

const CStreamingModelContainer = ({ label, details }: CStreamingModelContainer) => {
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
      <CLabel label={label} details={details} className="mb-1" />
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

export default CStreamingModelContainer;
