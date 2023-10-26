import React from 'react';

import CLabel from 'src/components/CLabel';
import CStreamingModel from 'src/components/CStreamingModel';
import toast from 'src/components/CToast';

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
        <CStreamingModel
          model="exponential"
          disabled
          onClick={() =>
            toast('error', 'Exponential streams are saved for a later version.')
          }
        />
      </div>
    </div>
  );
};

export default CStreamingModelContainer;
