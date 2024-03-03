import { Fragment, useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface CToggleProps {
  onChange: (value: boolean) => void;
  readonly?: boolean;
  isEnabled?: boolean;
}

const CToggle = ({ onChange, readonly, isEnabled }: CToggleProps) => {
  const [enabled, setEnabled] = useState(readonly);

  const handleChange = (value: boolean) => {
    if (!readonly) {
      setEnabled(value);
      onChange(value);
    }
  };

  useEffect(() => {
    if (!readonly) {
      if (isEnabled) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
  }, [isEnabled]);

  return (
    <Switch checked={enabled} onChange={handleChange} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${
            checked ? 'bg-togglePurple' : 'bg-gray-200'
          } relative inline-flex h-[25px] w-[36px] items-center rounded-[49px] `}
        >
          <span
            className={`${
              checked ? 'translate-x-[12.5px]' : 'translate-x-[4px]'
            } inline-block h-[19px] w-[20px] bg-white transition shadow-lg rounded-[49px]`}
          />
        </button>
      )}
    </Switch>
  );
};

export default CToggle;
