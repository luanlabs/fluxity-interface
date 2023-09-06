import React from 'react';

import CCard from 'src/components/CCard';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/svgs/Funnel';
import MagnifyingGlass from 'src/svgs/MagnifyingGlass';

import * as Styled from './styles';

const ActivityHistoryTable = () => {
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

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
      <CCard
        className="my-1 rounded-[14px] h-[74px] inline-flex items-center w-full px-[15px] py-[14px]"
        borderColor="#0000001A"
      >
        content
      </CCard>
    </>
  );
};

export default ActivityHistoryTable;
