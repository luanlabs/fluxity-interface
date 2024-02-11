import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Status } from 'src/models';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';

interface CStreamStatusButtonProps {
  type: Status;
  isCancelled: boolean;
  isStreamCancelled: boolean;
}

const CStreamStatusButton = ({
  type,
  isCancelled,
  isStreamCancelled,
}: CStreamStatusButtonProps) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isCancelled || isStreamCancelled) {
      setStatus('cancelled');
    } else {
      setStatus(type);
    }
  }, [isStreamCancelled, isCancelled]);

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
