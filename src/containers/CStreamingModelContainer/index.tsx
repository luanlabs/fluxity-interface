import React from 'react';

import CLabel from 'src/components/CLabel';
import CStreamingModel from 'src/components/CStreamingModel';

interface CStreamingModelContainer {
  label?: string;
  details?: string;
}

const CStreamingModelContainer = ({ label, details }: CStreamingModelContainer) => {
  return (
    <div className="w-[532px] flex flex-col">
      <CLabel label={label} details={details} className="mb-1" />
      <div className="flex gap-2">
        <CStreamingModel isSelected={true} model="linear" />
        <CStreamingModel model="exponential" disabled />
      </div>
    </div>
  );
};

export default CStreamingModelContainer;
