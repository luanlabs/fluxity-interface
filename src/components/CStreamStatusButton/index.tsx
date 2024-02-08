import cn from 'classnames';
import { useEffect, useState } from 'react';

import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';

export type StatusType = 'ongoing' | 'expired' | 'pending';
interface CStreamStatusButtonProps {
  type: StatusType;
  isCancelled: boolean;
}

const CStreamStatusButton = ({ type, isCancelled }: CStreamStatusButtonProps) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isCancelled) {
      setStatus('cancelled');
    } else {
      setStatus(type);
    }
  }, []);

  let statusStyle = 'bg-brightYellow border-burntOrange text-burntOrange';
  if (status === 'ongoing') {
    statusStyle = 'border-forestGreen bg-paleMint text-forestGreen';
  } else if (status === 'expired' || status === 'cancelled') {
    statusStyle = 'bg-lightGrayishBlue border-darkGrayishTeal text-darkGrayishTeal';
  }

  return (
    <div className={cn('border rounded-[63px] px-4 py-2', statusStyle)}>
      {capitalizeFirstLetter(status)}
    </div>
  );
};

export default CStreamStatusButton;
