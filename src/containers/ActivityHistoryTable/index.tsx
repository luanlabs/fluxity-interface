import React from 'react';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

const ActivityHistoryTable = () => {
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

  return <CStreamStatus onChange={handleStreamStatusChange} />;
};

export default ActivityHistoryTable;
