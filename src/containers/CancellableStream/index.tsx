import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';
import { useEffect, useState } from 'react';

export type ToggleStatus = 'ON' | 'OFF';

interface CancellableStreamProps {
  onChange: (value: ToggleStatus) => void;
  tooltipDetails: string;
  tooltipTitle: string;
  value: any;
}

const CancellableStream = ({
  onChange,
  tooltipTitle,
  tooltipDetails,
  value,
}: CancellableStreamProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggleChecker = (value: boolean) => {
    onChange(value ? 'ON' : 'OFF');
  };

  useEffect(() => {
    if (value === 'OFF') {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, [value, isEnabled]);

  return (
    <div className="w-full flex items-center justify-between sm:mb-10">
      <div className="flex items-center">
        <span className="text-[18px] text-darkBlue sm:font-[500]">Cancellable stream</span>
        <CLabel tooltipDetails={tooltipDetails} tooltipTitle={tooltipTitle} />
      </div>
      <div className="flex items-center">
        <CToggle onChange={handleToggleChecker} isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
      </div>
    </div>
  );
};

export default CancellableStream;
