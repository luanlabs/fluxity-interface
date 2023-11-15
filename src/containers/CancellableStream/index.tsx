import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';

export type ToggleStatus = 'ON' | 'OFF';

interface CancellableStreamProps {
  onChange: (value: ToggleStatus) => void;
  tooltipDetails: string;
  tooltipTitle: string;
}

const CancellableStream = ({ onChange, tooltipTitle, tooltipDetails }: CancellableStreamProps) => {
  const handleToggleChecker = (value: boolean) => {
    onChange(value ? 'ON' : 'OFF');
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-[18px] text-darkBlue">Cancellable stream</span>
        <CLabel tooltipDetails={tooltipDetails} tooltipTitle={tooltipTitle} />
      </div>
      <div className="flex items-center">
        <CToggle onChange={handleToggleChecker} />
      </div>
    </div>
  );
};

export default CancellableStream;
