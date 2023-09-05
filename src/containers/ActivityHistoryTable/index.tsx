import React from 'react';

import * as Styled from './styles';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

const ActivityHistoryTable = () => {
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

  return (
    <>
      <div className="inline-flex justify-between w-full">
        <CStreamStatus onChange={handleStreamStatusChange} />
        <span className="inline-flex gap-2">
          <Styled.Circle>s</Styled.Circle>
          <Styled.Circle>f</Styled.Circle>
        </span>
      </div>
    </>
  );
};

export default ActivityHistoryTable;
