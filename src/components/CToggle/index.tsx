import { Fragment, useState } from 'react';
import { Switch } from '@headlessui/react';

interface CToggleProps {
  onChange: (value: boolean) => void;
}

const CToggle = ({ onChange }: CToggleProps) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (value: boolean) => {
    setEnabled(value);
    onChange(value);
  };

  return (
    <Switch checked={enabled} onChange={handleChange} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${
            checked ? 'bg-togglePurple' : 'bg-gray-200'
          } relative inline-flex h-[25px] w-[36px] items-center rounded-[20px]`}
        >
          <span
            className={`${
              checked ? 'translate-x-3' : 'translate-x-1'
            } inline-block h-[20px] w-[21px] transform rounded-[100px] bg-white transition shadow-lg`}
          />
        </button>
      )}
    </Switch>
  );
};

export default CToggle;
