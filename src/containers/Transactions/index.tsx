import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import CStreamType from 'src/components/CStreamType';
import { StreamStatus } from 'src/components/CStreamStatus';
import { useAppSelector } from 'src/hooks/useRedux';
import { findTokenByAddress } from 'src/utils/findTokenByAddress';
import { shortenAddress } from 'src/utils/shortenAddress';
import humanizeAmount from 'src/utils/humanizeAmount';

import coin from 'public/images/coin.svg';
import divider from 'public/images/divider.svg';
import noStreams from 'public/images/noStreams.svg';
import rolling from 'public/images/rolling.svg';
import defaultToken from 'public/images/defaultToken.svg';

import capitalize from 'src/utils/capitalizeFirstLetter';
import { IFilterTokens } from 'src/constants/types';

import getStatusStyles from './getStatusStyle';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';

type StreamListProps = {
  searchValue: string;
  selectedStatus: StreamStatus;
  filteredValues: IFilterTokens;
};

const StreamsList = ({ searchValue, selectedStatus, filteredValues }: StreamListProps) => {
  const router = useRouter();
  const address = useAppSelector((state) => state.user.address);
  const tokens = useAppSelector((state) => state.tokens);
  const history = useAppSelector((state) => state.user.history);
  const isLoading = useAppSelector((state) => state.user.loadingHistory);

  const handleClick = (streamId: string) => {
    router.push(`/stream/${streamId}`);
  };

  const filteredStreamsByStatus = history.filter((stream) => stream.status === selectedStatus);

  const filteredStreams = filteredStreamsByStatus.filter((stream) => {
    const matchesSearch =
      stream.receiver.startsWith(searchValue.toUpperCase()) ||
      stream.sender.startsWith(searchValue.toUpperCase());

    let matchesFilter = true;

    if (!filteredValues.showSentStreams && stream.isSender) {
      matchesFilter = false;
    }
    if (!filteredValues.showReceivedStreams && !stream.isSender) {
      matchesFilter = false;
    }

    const matchesTokens =
      filteredValues.tokens.length === 0 ||
      filteredValues.tokens.some((token) => token.address === stream.token.address);

    return matchesSearch && matchesFilter && matchesTokens;
  });

  if (isLoading && address) {
    return (
      <div className="flex flex-col justify-center items-center w-full text-[#8F8F8F] font-medium">
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue mb-8">
          <Image src={rolling} alt="rolling" />
        </div>
        <p className="text-2xl">Loading Activity Data</p>
        <p className="mobile:text-center">Server is fetching your streams log, please wait.</p>
      </div>
    );
  }

  return (
    <div className="overflow-scroll desktop:min-h-[200px]">
      {filteredStreams.map((stream) => (
        <CCard
          className="mobile:z-40 mobile:flex-col mobile:relative mobile:my-2 my-1 rounded-[14px] desktop:h-[74px] desktop:inline-flex items-center 
            w-full desktop:px-[15px] desktop:py-[14px] mobile:p-2 mobile:pb-4 cursor-pointer hover:bg-[#f5f5f5] transition-all duration-700"
          borderColor="#0000001A"
          key={`stream-${stream.id}`}
          onClick={() => handleClick(stream.id)}
        >
          <div className="desktop:inline-flex items-center">
            <CStreamType isSender={stream.isSender} streamStatus={stream.status} />
            <hr className="desktop:hidden w-full" />
            <div
              className={`flex desktop:gap-2 ${
                stream.isSender ? 'desktop:ml-8' : 'desktop:ml-4'
              } desktop:w-[160px] mobile:justify-between mobile:bg-alabaster mobile:p-2 mobile:rounded-[10px] mobile:my-1`}
            >
              <span
                className={`text-transparentMidnightBlue mobile:text-midnightBlue ${
                  stream.isSender && 'pr-5'
                } w-[100px]`}
              >
                {stream.isSender ? 'To' : 'From'}
              </span>
              {shortenAddress(stream.sender === address ? stream.receiver : stream.sender, 4)}
            </div>
          </div>
          <Image
            src={divider}
            alt="divider"
            className={`mx-5  ${
              stream.status === StreamStatus.PENDING ? 'hidden' : 'block'
            } mobile:hidden`}
          />
          <div
            className={`flex mobile:flex-col-reverse w-full ${
              stream.status === StreamStatus.PENDING
                ? 'desktop:justify-end'
                : 'desktop:justify-between'
            }  items-center`}
          >
            <div
              className={`text-sm mobile:w-full mobile:mt-5 ${
                stream.status === StreamStatus.PENDING ? 'hidden' : 'block'
              }
                  ${stream.status === StreamStatus.EXPIRED && 'flex items-center'}`}
            >
              <div></div>
              {stream.status === StreamStatus.EXPIRED ? (
                <div className="flex justify-between items-center w-full text-base font-medium">
                  <p> Completed</p>
                  <Image
                    src={coin}
                    alt="coin"
                    className={`${
                      isStreamWithdrawable(stream)
                        ? 'mobile:block desktop:hidden bg-[#FFF59A] rounded-full mr-1'
                        : ''
                    }`}
                  />
                </div>
              ) : (
                <div className="mobile:flex mobile:flex-col-reverse mobile:gap-2 mobile:font-medium">
                  <div className="mobile:ml-1"> {stream.completionPercentage}% Completed</div>
                  <div className="desktop:w-[190px] mobile:!w-full bg-[#EBEBEB] rounded-full h-1 mt-1">
                    <div
                      className="bg-royalBlue rounded-full h-1"
                      style={{
                        width: stream.completionPercentage + '%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center mobile:w-full">
              <div
                className={`select-none rounded-full px-4 py-0.5 mobile:absolute mobile:top-4 mobile:right-4
            ${getStatusStyles(stream.status)}`}
              >
                {stream.status === StreamStatus.ONGOING ? 'Active' : capitalize(stream.status)}
              </div>
              {isStreamWithdrawable(stream) && stream.status === StreamStatus.EXPIRED ? (
                <Image
                  src={coin}
                  alt="coin"
                  className={`ml-3 mobile:hidden desktop:block bg-[#FFF59A] rounded-full mr-1`}
                />
              ) : (
                <div className="mobile:hidden h-6 w-6 ml-3" />
              )}

              <div
                className="flex desktop:ml-[47px] items-center desktop:justify-end desktop:font-bold gap-2 desktop:w-[160px]
              mobile:justify-between mobile:bg-alabaster mobile:p-2 mobile:rounded-[10px] mobile:my-1 mobile:w-full"
              >
                <span className="desktop:hidden text-midnightBlue">Amount</span>
                <div className="inline-flex gap-2 items-center">
                  <span> {humanizeAmount(stream.streamAmount)}</span>
                  <span> {findTokenByAddress(stream.token.address, tokens)}</span>
                  <span>
                    <Image
                      src={stream.token.logo ? stream.token.logo : defaultToken}
                      alt="icon"
                      className="mobile:w-5 mobile:h-5"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CCard>
      ))}
      {((!address && !isLoading) || !filteredStreams.length) && (
        <div className="flex flex-col justify-center items-center w-full select-none desktop:min-h-[200px]">
          <Image src={noStreams} alt="icon" />
          <p className="font-medium text-2xl text-[#8F8F8F]">No {selectedStatus} Streams</p>
          <p className="mt-2 font-medium text-base text-[#8F8F8F] leading-4 mobile:text-center">
            There are no active streams at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamsList;
