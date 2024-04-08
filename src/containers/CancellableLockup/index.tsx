import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';
import { useEffect, useState } from 'react';
import { operationType } from '../CreateLockup';

export type ToggleStatus = 'ON' | 'OFF';

interface CancellableLockupProps {
  onChange: (value: ToggleStatus) => void;
  tooltipDetails: string;
  tooltipTitle: string;
  value: ToggleStatus;
  operationType: operationType;
}

const CancellableLockup = ({
  onChange,
  tooltipTitle,
  tooltipDetails,
  value,
  operationType,
}: CancellableLockupProps) => {
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

  const handleToggleChecker = (value: boolean) => {
    onChange(value ? 'ON' : 'OFF');
  };

  useEffect(() => {
    if (value === 'OFF') {
      setIsToggleEnabled(false);
    } else {
      setIsToggleEnabled(true);
    }
  }, [value, isToggleEnabled]);

  return (
    <div className="w-full flex items-center justify-between sm:mb-10">
      <div className="flex items-center">
        <span className="text-[18px] text-darkBlue sm:font-[500]">Cancellable {operationType}</span>
        <CLabel tooltipDetails={tooltipDetails} tooltipTitle={tooltipTitle} />
      </div>
      <div className="flex items-center">
        <CToggle onChange={handleToggleChecker} isToggleEnabled={isToggleEnabled} />
      </div>
    </div>
  );
};

export default CancellableLockup;
