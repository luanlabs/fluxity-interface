'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import fetch from 'src/utils/request';
import CCard from 'src/components/CCard';
import { useAppSelector } from 'src/hooks/useRedux';
import CStreamType from 'src/components/CStreamType';
import humanizeAmount from 'src/utils/humanizeAmount';
import capitalize from 'src/utils/capitalizeFirstLetter';
import { shortenAddress } from 'src/utils/shortenAddress';
import { findTokenByAddress } from 'src/utils/findTokenByAddress';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

// import Funnel from 'src/assets/Funnel';
import divider from 'public/images/divider.svg';
import noStreams from 'public/images/noStreams.svg';

import usdc from 'public/images/assets/fusdc.svg';
import searchLogo from 'public/images/search.svg';

import * as Styled from './styles';
import useFetchHistory from './useFetchHistory';
import getStatusStyles from './getStatusStyle';
import { useRouter } from 'next/navigation';

const Transactions = () => {
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus>(StreamStatus.ONGOING);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const address = useAppSelector((state) => state.user.address);
  const tokens = useAppSelector((state) => state.tokens);
  const streams = useFetchHistory(address);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleClick = (streamId: string) => {
    router.push(`/stream/${streamId}`);
  };

  const filteredStreamsByStatus = streams.filter((stream) => stream.status === selectedStatus);

  const filteredStreams = filteredStreamsByStatus.filter(
    (stream) =>
      stream.receiver.startsWith(searchValue.toUpperCase()) ||
      stream.sender.startsWith(searchValue.toUpperCase()),
  );

  return (
    <>
      <div className="inline-flex justify-between w-full mb-[17px]">
        <CStreamStatus onChange={setSelectedStatus} />
        <span className="inline-flex gap-2">
          <Styled.Circle isopen={openSearch} className={`${openSearch ? 'bg-[#F5F5F5]' : ''}`}>
            <input
              placeholder="Search wallet address"
              onChange={onChange}
              autoFocus
              className={`${
                openSearch ? 'block' : 'hidden'
              } h-9 w-[200px] focus:outline-none bg-[#F5F5F5]`}
            />
            <Image
              src={searchLogo}
              alt="searchLogo"
              className="select-none"
              draggable={false}
              onClick={handleSearch}
            />
          </Styled.Circle>
          {/* <Styled.Circle className="hover:bg-lavenderBlush transition-all duration-700">
            <Funnel />
          </Styled.Circle> */}
        </span>
      </div>
      <div>
        {address &&
          filteredStreams.map((stream) => (
            <CCard
              className="my-1 rounded-[14px] h-[74px] inline-flex items-center 
            w-full px-[15px] py-[14px] justify-between cursor-pointer hover:bg-[#f5f5f5] transition-all duration-700"
              borderColor="#0000001A"
              key={stream._id}
              onClick={() => handleClick(stream._id)}
            >
              <div className="inline-flex items-center">
                <CStreamType isSender={stream.isSender} streamStatus={stream.status} />
                <div className={`flex gap-2 ${stream.isSender ? 'ml-8' : 'ml-4'} w-[160px]`}>
                  <span
                    className={`text-transparentMidnightBlue ${
                      stream.isSender && 'pr-5'
                    } w-[100px]`}
                  >
                    {stream.isSender ? 'To' : 'From'}
                  </span>
                  {shortenAddress(stream.sender === address ? stream.receiver : stream.sender, 4)}
                </div>
                <div className="flex flex-row gap-5">
                  <Image
                    src={divider}
                    alt="divider"
                    className={`mx-5 ${
                      stream.status === StreamStatus.PENDING ? 'hidden' : 'block'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      stream.status === StreamStatus.PENDING ? 'hidden' : 'block'
                    }
                  ${stream.status === StreamStatus.EXPIRED && 'flex items-center '}`}
                  >
                    {stream.status === StreamStatus.EXPIRED ? (
                      <span className="text-base font-medium">Completed</span>
                    ) : (
                      <>
                        {stream.completionPercentage}% Completed
                        <div className="w-[190px] bg-[#EBEBEB] rounded-full h-1 mt-1">
                          <div
                            className="bg-royalBlue rounded-full h-1"
                            style={{
                              width: stream.completionPercentage + '%',
                            }}
                          />
                        </div>
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-[47px]">
                <div
                  className={`select-none rounded-full px-4 py-0.5
            ${getStatusStyles(stream.status)}`}
                >
                  {stream.status === StreamStatus.ONGOING ? 'Active' : capitalize(stream.status)}
                </div>
                <div className="flex items-center justify-end font-bold gap-2 w-[160px]">
                  <span> {humanizeAmount(stream.streamAmount)}</span>
                  <span> {findTokenByAddress(stream.token, tokens)}</span>
                  <Image src={usdc} alt="icon" />
                </div>
              </div>
            </CCard>
          ))}
        {(!address || !filteredStreams.length) && (
          <div className="flex flex-col justify-center items-center w-full select-none">
            <Image src={noStreams} alt="icon" />
            <p className="font-medium text-2xl text-[#8F8F8F]">No {selectedStatus} Streams</p>
            <p className="mt-2 font-medium text-base text-[#8F8F8F] leading-4">
              There are no active streams at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
