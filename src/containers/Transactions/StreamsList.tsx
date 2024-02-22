import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CCard from 'src/components/CCard';
import { StreamStatus } from 'src/components/CStreamStatus';
import CStreamType from 'src/components/CStreamType';
import { useAppSelector } from 'src/hooks/useRedux';
import { findTokenByAddress } from 'src/utils/findTokenByAddress';
import humanizeAmount from 'src/utils/humanizeAmount';
import { shortenAddress } from 'src/utils/shortenAddress';
import getStatusStyles from './getStatusStyle';

import divider from 'public/images/divider.svg';
import noStreams from 'public/images/noStreams.svg';
import rolling from 'public/images/rolling.svg';
import defaultToken from 'public/images/defaultToken.svg';

import capitalize from 'src/utils/capitalizeFirstLetter';
import { IFilterTokens } from 'src/constants/types';

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

    const matchesReceivedStreams = !filteredValues.showReceivedStreams || !stream.isSender;

    const matchesSentStreams = !filteredValues.showSentStreams || stream.isSender;

    const matchesBothStreams =
      !filteredValues.showSentStreams || !filteredValues.showReceivedStreams;

    const matchesTokens =
      filteredValues.tokens.length === 0 ||
      filteredValues.tokens.some((token) => token.address === stream.token.address);

    return (
      matchesSearch &&
      matchesReceivedStreams &&
      matchesSentStreams &&
      matchesBothStreams &&
      matchesTokens
    );
  });

  if (isLoading && address) {
    return (
      <div className="flex flex-col mobile:h-[calc(100%-150px)] justify-center items-center w-full text-[#8F8F8F] font-medium">
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue mb-8">
          <Image src={rolling} alt="rolling" />
        </div>
        <p className="text-2xl">Loading Activity Data</p>
        <p className="mobile:text-center">Server is fetching your streams log, please wait.</p>
      </div>
    );
  }
  return (
    <div className="h-full">
      {filteredStreams.map((stream) => (
        <CCard
          className="my-1 rounded-[14px] h-[74px] inline-flex items-center 
            w-full px-[15px] py-[14px] justify-between cursor-pointer hover:bg-[#f5f5f5] transition-all duration-700"
          borderColor="#0000001A"
          key={`stream-${stream.id}`}
          onClick={() => handleClick(stream.id)}
        >
          <div className="inline-flex items-center">
            <CStreamType isSender={stream.isSender} streamStatus={stream.status} />
            <div className={`flex gap-2 ${stream.isSender ? 'ml-8' : 'ml-4'} w-[160px]`}>
              <span
                className={`text-transparentMidnightBlue ${stream.isSender && 'pr-5'} w-[100px]`}
              >
                {stream.isSender ? 'To' : 'From'}
              </span>
              {shortenAddress(stream.sender === address ? stream.receiver : stream.sender, 4)}
            </div>
            <div className="flex flex-row gap-5">
              <Image
                src={divider}
                alt="divider"
                className={`mx-5 ${stream.status === StreamStatus.PENDING ? 'hidden' : 'block'}`}
              />
              <span
                className={`text-sm ${stream.status === StreamStatus.PENDING ? 'hidden' : 'block'}
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
              <span> {findTokenByAddress(stream.token.address, tokens)}</span>
              <Image src={stream.token.logo ? stream.token.logo : defaultToken} alt="icon" />
            </div>
          </div>
        </CCard>
      ))}
      {((!address && !isLoading) || !filteredStreams.length) && (
        <div className="flex flex-col mobile:h-[calc(100%-150px)] justify-center items-center w-full select-none">
          <Image src={noStreams} alt="icon" />
          <p className="font-medium text-2xl text-[#8F8F8F]">No {selectedStatus} Streams</p>
          <p className="mt-2 font-medium text-base text-[#8F8F8F] leading-4">
            There are no active streams at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamsList;
