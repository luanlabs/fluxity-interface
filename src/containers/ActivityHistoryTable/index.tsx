"use client";

import React from "react";

import CCard from "src/components/CCard";
import CStreamStatus, { StreamStatus } from "src/components/CStreamStatus";

import Funnel from "src/svgs/Funnel";
import MagnifyingGlass from "src/svgs/MagnifyingGlass";

import * as Styled from "./styles";
import useFetchHistory from "./useFetchHistory";

const ActivityHistoryTable = () => {
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

  const streams = useFetchHistory("0x61F13004967166f9496D6AE0B52db7Ee2Cabaf00");

  console.log(streams);

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

      {streams.map((stream, i) => (
        <CCard
          className="my-1 rounded-[14px] h-[74px] inline-flex items-center w-full px-[15px] py-[14px]"
          borderColor="#0000001A"
          key={i}
        >
          {stream.token}
          {stream.amount}
          {stream.address}
          {stream.isActive}
          {stream.streamType}
          {stream.completionPercentage}
        </CCard>
      ))}
    </>
  );
};

export default ActivityHistoryTable;
