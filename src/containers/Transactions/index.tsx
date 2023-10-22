'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import CCard from 'src/components/CCard';
import CStreamType from 'src/components/CStreamType';
import { formatNumber } from 'src/utils/formatNumber';
import capitalize from 'src/utils/capitalizeFirstLetter';
import { shortenAddress } from 'src/utils/shortenAddress';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/assets/Funnel';
import divider from 'public/images/divider.svg';

import usdt from 'public/images/usdt.svg';
import MagnifyingGlass from 'src/assets/MagnifyingGlass';

import * as Styled from './styles';
import useFetchHistory from './useFetchHistory';
import getStatusStyles from './getStatusStyle';

const Transactions = () => {
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus>(
    StreamStatus.ONGOING
  );

  const address = 'GA3A24K44D5JXIJ4RDPZTZLGZCUCJTMO2HKCFJ5CK6FYTEVUEIICSIXW';

  const streams = useFetchHistory(address);

  const filteredStreams = selectedStatus
    ? streams.filter((stream) => stream.streamStatus === selectedStatus)
    : streams;

  return (
    <>
      <div className="inline-flex justify-between w-full mb-[17px]">
        <CStreamStatus onChange={setSelectedStatus} />
        <span className="inline-flex gap-2">
          <Styled.Circle>
            <MagnifyingGlass />
          </Styled.Circle>
          <Styled.Circle>
            <Funnel />
          </Styled.Circle>
        </span>
      </div>
      <Styled.Scroll>
        {filteredStreams.map((stream) => (
          <CCard
            className="my-1 rounded-[14px] h-[74px] inline-flex items-center w-full px-[15px] py-[14px] justify-between"
            borderColor="#0000001A"
            key={stream.id}
          >
            <div className="inline-flex  items-center">
              <CStreamType type={stream.streamType} />
              <div className="flex gap-2 ml-5 w-[140px]">
                <span
                  className={`text-transparentMidnightBlue ${
                    stream.streamType === 'send' && 'pr-4 '
                  }`}
                >
                  {stream.streamType === 'send' ? 'To' : 'From'}
                </span>
                {shortenAddress(stream.address, 4)}
              </div>
              <div className="flex flex-row gap-5">
                <Image src={divider} alt="divider" className="mx-5" />
                <span className="text-sm">
                  {stream.completionPercentage}% Completed
                  <div className="w-[190px] bg-[#EBEBEB] rounded-full h-1 mt-1">
                    <div
                      className="bg-royalBlue rounded-full h-1"
                      style={{
                        width: stream.completionPercentage + '%',
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-[47px]">
              <div
                className={`select-none rounded-full px-4 py-0.5
            ${getStatusStyles(stream.streamStatus)}`}
              >
                {stream.streamStatus === StreamStatus.ONGOING
                  ? 'Active'
                  : capitalize(stream.streamStatus)}
              </div>
              <div className="inline-flex justify-end font-bold gap-2 w-[160px]">
                <span> {formatNumber(stream.amount)}</span>
                <span> {stream.token}</span>
                <span>
                  <Image src={stream.token === 'USDT' ? usdt : ''} alt="icon" />
                </span>
              </div>
            </div>
          </CCard>
        ))}{' '}
      </Styled.Scroll>
    </>
  );
};

export default Transactions;
