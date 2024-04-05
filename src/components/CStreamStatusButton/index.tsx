import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Status } from 'src/models';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';

interface CStreamStatusButtonProps {
  type: Status;
  isCancelled: boolean;
  isStreamCancelled: boolean;
  className?: string;
}

const CStreamStatusButton = ({
  type,
  isCancelled,
  isStreamCancelled,
  className,
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
  } else if (status === 'completed' || status === 'cancelled') {
    statusStyle = 'bg-lightGrayishBlue border-darkGrayishTeal text-darkGrayishTeal';
  }

  return (
    <div
      className={cn(
        'border rounded-[63px] px-4 py-2 flex items-center justify-center',
        statusStyle,
        className,
      )}
    >
      {capitalizeFirstLetter(status)}
    </div>
  );
};

export default CStreamStatusButton;
