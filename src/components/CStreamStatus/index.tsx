import React, { useState } from 'react';

export enum StreamStatus {
  ONGOING = 'ongoing',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

type CStreamStatusProps = {
  onChange: (value: StreamStatus) => void;
};

const streamStatuses = [
  { label: 'Ongoing', value: StreamStatus.ONGOING },
  { label: 'Pending', value: StreamStatus.PENDING },
  { label: 'Completed', value: StreamStatus.COMPLETED },
];

const CStreamStatus = ({ onChange }: CStreamStatusProps) => {
  const [activeStatus, setActiveStatus] = useState(StreamStatus.ONGOING);

  const handleChange = (value: StreamStatus) => {
    setActiveStatus(value);
    onChange(value);
  };

  return (
    <div
      className="inline-flex mobile:h-[52px] justify-center items-center rounded-[55px] border-[1px] py-2 px-2 
      mobile:border-[#0501421A] border-midnightBlue gap-2 cursor-pointer select-none h-[48px]"
    >
      {streamStatuses.map((item) => (
        <div
          key={item.label}
          className={`px-4 py-1 mobile:py-2 mobile:text-base xs:!text-sm font-medium ${
            activeStatus === item.value &&
            'bg-lavenderBlush rounded-[63px] transition-all duration-700'
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
