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
          } relative inline-flex h-[30px] w-11 items-center rounded-[50px]`}
        >
          <span
            className={`${
              checked ? 'translate-x-5' : 'translate-x-1'
            } inline-block h-[22px] w-[22px] transform rounded-[50px] bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
};

export default CToggle;
