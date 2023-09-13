'use client';

import React from 'react';
import Image from 'next/image';

import CCard from 'src/components/CCard';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';
import CStreamType from 'src/components/CStreamType';

import clipText from 'src/utils/ClipText';

import divider from 'public/images/divider.svg';

import Funnel from 'src/svgs/Funnel';
import MagnifyingGlass from 'src/svgs/MagnifyingGlass';

import * as Styled from './styles';
import useFetchHistory from './useFetchHistory';

const ActivityHistoryTable = () => {
  const handleStreamStatusChange = (value: StreamStatus) => {
    console.log(value);
  };

  const address = '0x123456789';

  const streams = useFetchHistory(address);

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
          <div className="flex items-center gap-4">
            <CStreamType type={stream.streamType} />
            <div className="flex gap-2">
              <span
                className={`text-transparentmidnightblue ${
                  stream.streamType === 'send' && 'mr-4'
                }`}
              >
                {stream.streamType === 'send' ? 'To' : 'From'}
              </span>
              {clipText(stream.address, 4)}
            </div>
            <Image src={divider} alt="divider" />
            <span className="text-[14px]">
              {stream.completionPercentage}% Completed
              <div className="w-[190px] bg-[#EBEBEB] rounded-full h-1">
                <div
                  className="bg-royalBlue rounded-full h-1"
                  style={{
                    width: stream.completionPercentage + '%',
                    transition: 'width 0.3s ease-in-out',
                  }}
                />
              </div>
            </span>
            <span> {stream.isActive}</span>
            <span> {stream.amount}</span>
            <span> {stream.token}</span>
          </div>
        </CCard>
      ))}
    </>
  );
};

export default ActivityHistoryTable;
