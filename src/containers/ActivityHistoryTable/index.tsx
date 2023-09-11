import React, { useState } from 'react';

import CCard from 'src/components/CCard';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/svgs/Funnel';
import MagnifyingGlass from 'src/svgs/MagnifyingGlass';

import * as Styled from './styles';
import useFetchHistory from './useFetchHistory';

const ActivityHistoryTable = () => {
  const [streams, setStreams] = useState([]);
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

  const fetchHistory = useFetchHistory(
    '0x61F13004967166f9496D6AE0B52db7Ee2Cabaf00'
  );
  fetchHistory.then((streams) => {
    setStreams(streams);
  });

  return (
    <>
      <div className="inline-flex justify-between w-full mb-[17px]">
        <CStreamStatus onChange={handleStreamStatusChange} />
        <span className="inline-flex gap-2">
          <Styled.Circle>
            <MagnifyingGlass />
          </Styled.Circle>
          <Styled.Circle>
            <Funnel />
          </Styled.Circle>
        </span>
      </div>

      {streams.map((streams, i) => (
        <CCard
          className="my-1 rounded-[14px] h-[74px] inline-flex items-center w-full px-[15px] py-[14px]"
          borderColor="#0000001A"
          key={i}
        >
          .
        </CCard>
      ))}
    </>
  );
};

export default ActivityHistoryTable;
