import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import CLabel from 'src/components/CLabel';
import CStreamingModel from 'src/components/CStreamingModel';
import { toastError } from 'src/components/CToast/toastContent';

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
            toastError(toast, true, 'Exponential streams are saved for a later version.')
          }
        />
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default CStreamingModelContainer;
