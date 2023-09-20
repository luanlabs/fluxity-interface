'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import CCard from 'src/components/CCard';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';
import CStreamType from 'src/components/CStreamType';

import { clipText } from 'src/utils/clipText';
import { formatNumber } from 'src/utils/formatNumber';

import usdt from 'public/images/usdt.svg';
import divider from 'public/images/divider.svg';

import Funnel from 'src/svgs/Funnel';
import MagnifyingGlass from 'src/svgs/MagnifyingGlass';

import * as Styled from './styles';
import useFetchHistory from './useFetchHistory';

const ActivityHistoryTable = () => {
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus | ''>(
    StreamStatus.ONGOING
  );

  const handleStreamStatusChange = (value: StreamStatus) => {
    setSelectedStatus(value);
  };
  const address = '0x123456789';

  const streams = useFetchHistory(address);

  const filteredStreams = selectedStatus
    ? streams.filter((stream) => stream.streamStatus === selectedStatus)
    : streams;

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

      {filteredStreams.map((stream, i) => (
        <CCard
          className="my-1 rounded-[14px] h-[74px] inline-flex items-center w-full px-[15px] py-[14px] justify-between"
          borderColor="#0000001A"
          key={stream.amount}
        >
          <div className="inline-flex  items-center">
            <CStreamType type={stream.streamType} />
            <div className="flex gap-2 ml-5 w-[140px]">
              <span
                className={`text-transparentmidnightblue ${
                  stream.streamType === 'send' && 'pr-4 '
                }`}
              >
                {stream.streamType === 'send' ? 'To' : 'From'}
              </span>
              {clipText(stream.address, 4)}
            </div>
            <div className="flex flex-row gap-5">
              <Image src={divider} alt="divider" className="mx-5" />
              <span className="text-[14px]">
                {stream.completionPercentage}% Completed
                <div className="w-[190px] bg-[#EBEBEB] rounded-full h-1 mt-1">
                  <div
                    className="bg-royalBlue rounded-full h-1"
                    style={{
                      width: stream.completionPercentage + '%',
                      transition: 'width 0.3s ease-in-out',
                    }}
                  />
                </div>
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-[47px]">
            <div
              className={`select-none rounded-full px-4 py-0.5
            ${
              stream.streamStatus === StreamStatus.ONGOING
                ? 'bg-paleMint text-forestGreen'
                : stream.streamStatus === StreamStatus.PENDING
                ? 'bg-paleCyan text-royalBlue'
                : 'bg-gray-100 text-gray-500'
            }`}
            >
              {stream.streamStatus === StreamStatus.ONGOING
                ? 'Active'
                : stream.streamStatus}
            </div>
            <div className="inline-flex justify-end font-bold gap-2 w-[160px]">
              <span> {formatNumber(stream.amount)}</span>
              <span> {stream.token}</span>
              <span>
                {/* use usdt as default until we get token assets  */}
                <Image src={stream.token === 'USDT' ? usdt : usdt} alt="icon" />
              </span>
            </div>
          </div>
        </CCard>
      ))}
    </>
  );
};

export default ActivityHistoryTable;
