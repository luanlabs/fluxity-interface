import React, { useState } from 'react';

export enum StreamStatus {
  ONGOING = 'ongoing',
  PENDING = 'pending',
  EXPIRED = 'expired',
}

const streamStatuses = [
  { label: 'Ongoing', value: StreamStatus.ONGOING },
  { label: 'Pending', value: StreamStatus.PENDING },
  { label: 'Expired', value: StreamStatus.EXPIRED },
];

type CStreamStatusProps = {
  onChange: (value: StreamStatus) => void;
};

const CStreamStatus = ({ onChange }: CStreamStatusProps) => {
  const [activeStatus, setActiveStatus] = useState('ongoing');

  const handleChange = (value: StreamStatus) => {
    setActiveStatus(value);
    onChange(value);
  };

  return (
    <div
      className="inline-flex rounded-[55px] border-[1px] py-2 px-[10px]
     border-midnightblue gap-[10px] cursor-pointer select-none"
    >
      {streamStatuses.map((item) => (
        <div
          key={item.label}
          className={`px-4 py-2 ${
            activeStatus === item.value && 'bg-lavenderblush rounded-[63px]'
          }`}
          onClick={() => handleChange(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default CStreamStatus;
