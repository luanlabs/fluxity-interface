import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';

export type ToggleStatus = 'ON' | 'OFF';

interface CancellableStreamProps {
  onChange: (value: ToggleStatus) => void;
}

const CancellableStream = ({ onChange }: CancellableStreamProps) => {
  const handleToggleChecker = (value: boolean) => {
    onChange(value ? 'ON' : 'OFF');
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-[18px] text-darkBlue">Cancellable stream</span>
        <CLabel details="Turn on this feature if you want to create a cancellable stream" />
      </div>
      <div className="flex items-center">
        <CToggle onChange={handleToggleChecker} />
      </div>
    </div>
  );
};

export default CancellableStream;
