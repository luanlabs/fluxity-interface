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
import formatUnits from 'src/utils/formatUnits';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';

import coin from 'public/images/coin.svg';
import divider from 'public/images/divider.svg';
import rolling from 'public/images/rolling.svg';
import defaultToken from 'public/images/defaultToken.svg';

import capitalize from 'src/utils/capitalizeFirstLetter';
import { IFilterTokens, IStreamHistory } from 'src/constants/types';

import getStatusStyles from './getStatusStyle';
import isStreamWithdrawable from 'src/features/isStreamWithdrawable';
import CEmptyList from 'src/components/CEmptyList';

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

  const filteredStreamsByStatus = history.filter((stream) => {
    if (
      (stream.status === StreamStatus.CANCELLED || stream.status === StreamStatus.COMPLETED) &&
      selectedStatus === StreamStatus.COMPLETED
    ) {
      return true;
    }
    return stream.status === selectedStatus;
  });

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
  const completionPercentage = (stream: IStreamHistory) => {
    const { receiverAmount } = calculateStreamAmounts(
      stream.start_date,
      stream.end_date,
      stream.cliff_date,
      stream.is_cancelled,
      formatUnits(stream.withdrawn, stream.token.decimals),
      formatUnits(stream.amount, stream.token.decimals),
    );
    const formattedAmount = formatUnits(stream.amount, stream.token.decimals);

    return calculateCompletionPercentage(
      stream.start_date,
      stream.end_date,
      formattedAmount,
      receiverAmount.toString(),
    );
  };

  if (isLoading && address) {
    return (
      <div className="desktop:min-h-[200px] flex flex-col justify-center h-full items-center w-full text-[#8F8F8F] font-medium">
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue mb-8">
          <Image src={rolling} alt="rolling" />
        </div>
        <p className="text-2xl">Loading Activity Data</p>
        <p className="mobile:text-center">Server is fetching your streams log, please wait.</p>
      </div>
    );
  }

  const handleStatus = (status: string) => {
    if (status === StreamStatus.ONGOING) {
      return 'Active';
    }
    if (status === StreamStatus.COMPLETED) {
      return 'Settled';
    }
    if (status === StreamStatus.CANCELLED) {
      return 'Cancelled';
    }
    return capitalize(status);
  };

  return (
    <div className="overflow-scroll desktop:min-h-[200px] h-full">
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
                  ${stream.status === StreamStatus.COMPLETED && 'flex items-center'}`}
            >
              {stream.status === StreamStatus.COMPLETED ? (
                <div className="flex justify-between items-center w-full text-base font-medium">
                  <div>
                    <p> {completionPercentage(stream)}% Completed</p>
                    <div className="desktop:w-[190px] mobile:!w-full bg-[#EBEBEB] rounded-full h-1 mt-1">
                      <div
                        className="bg-royalBlue rounded-full h-1"
                        style={{
                          width: completionPercentage(stream) + '%',
                        }}
                      />
                    </div>
                    <Image
                      src={coin}
                      alt="coin"
                      className={`${
                        isStreamWithdrawable(stream) && !stream.isSender
                          ? 'mobile:block desktop:hidden bg-[#FFF59A] rounded-full mr-1'
                          : 'desktop:hidden mobile:hidden'
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div className="mobile:flex mobile:flex-col-reverse mobile:gap-2 mobile:font-medium">
                  <div className="mobile:ml-1"> {completionPercentage(stream)}% Completed</div>
                  <div className="desktop:w-[190px] mobile:!w-full bg-[#EBEBEB] rounded-full h-1 mt-1">
                    <div
                      className="bg-royalBlue rounded-full h-1"
                      style={{
                        width: completionPercentage(stream) + '%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center mobile:w-full">
              <div
                className={`select-none rounded-full px-4 py-0.5 mobile:absolute mobile:top-4 mobile:right-4
            ${getStatusStyles(stream.status)}
            ${stream.status === StreamStatus.COMPLETED ? 'mobile:mr-[10px]' : ''}`}
              >
                {handleStatus(stream.status)}
              </div>
              <div>
                {isStreamWithdrawable(stream) && !stream.isSender ? (
                  <Image
                    src={coin}
                    alt="coin"
                    className={`ml-3 mobile:hidden desktop:block bg-[#FFF59A] rounded-full mr-1`}
                  />
                ) : (
                  <div className="mobile:hidden h-6 w-6 mr-[19px]" />
                )}
              </div>

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
        <CEmptyList
          status={`No ${selectedStatus} Streams`}
          description="There are no active streams at the moment."
        />
      )}
    </div>
  );
};

export default StreamsList;
