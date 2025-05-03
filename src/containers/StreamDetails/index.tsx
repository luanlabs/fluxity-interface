/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import BN from 'src/utils/BN';

import { CancelAmounts } from 'src/models';
import formatUnits from 'src/utils/formatUnits';
import CPageCard from 'src/components/CPageCard';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import useGetStreamById from 'src/utils/getStreamById';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import calculateStreamAmounts from 'src/utils/calculateStreamAmount';
import CStreamStatusButton from 'src/components/CStreamStatusButton';
import calculateVestingAmounts from 'src/utils/calculateVestingAmount';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';
import { isStreamCancellable, isStreamCancelledStatus } from 'src/features/isStreamCancellable';

import Loading from './Loading';
import BlueCard from './BlueCard';
import StreamIcon from './StreamIcon';
import SummaryFields from './SummaryFields';
import SenderStatusCard from './SenderStatusCard';
import ReceiverStatusCard from './ReceiverStatusCard';
import DynamicStreamedAmount from './DynamicStreamedAmount';
import { useSwitchNetwork } from '@bluxcc/react';
import nameToNetworkDetail from 'src/utils/nameToNetworkDetail';
import { setNetwork } from 'src/reducers/user';

interface StreamDetailsProps {
  id: string;
  network: string;
}

const StreamDetails = ({ id, network }: StreamDetailsProps) => {
  const { switchNetwork } = useSwitchNetwork();
  const dispatch = useAppDispatch();
  const currentNetwork = nameToNetworkDetail(network);

  useEffect(() => {
    switchNetwork(currentNetwork.networkPassphrase);
    dispatch(setNetwork(currentNetwork));
  }, [currentNetwork]);

  const address = useAppSelector((state) => state.user.address);
  const { loading, data, error } = useGetStreamById(id, network);

  const [cancelAmounts, setCancelAmounts] = useState<CancelAmounts>({
    senderAmount: 0,
    receiverAmount: 0,
  });

  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const isStreamCancelled = cancelAmounts.senderAmount !== 0 || cancelAmounts.receiverAmount !== 0;
  const operationType = data?.is_vesting ? 'vesting' : 'stream';

  const [sendLockupAmount, setSendLockupAmount] = useState(
    data?.is_vesting
      ? calculateVestingAmounts(0, 0, 0, false, '0', '0', '0').receiverAmount
      : calculateStreamAmounts(0, 0, 0, false, '0', '0').receiverAmount,
  );

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (!isStreamCancelled) {
      intervalId = setInterval(() => {
        if (data) {
          if (!data.is_vesting) {
            setSendLockupAmount(
              calculateStreamAmounts(
                data.start_date,
                data.end_date,
                data.cliff_date,
                data.is_cancelled,
                formatUnits(data.withdrawn, data.token.decimals),
                formatUnits(data.amount, data.token.decimals),
              ).receiverAmount,
            );
          } else {
            setSendLockupAmount(
              calculateVestingAmounts(
                data.start_date,
                data.end_date,
                data.cliff_date,
                data.is_cancelled,
                formatUnits(data.withdrawn, data.token.decimals),
                data.rate.toString(),
                formatUnits(data.amount, data.token.decimals),
              ).receiverAmount,
            );
          }
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [data, isStreamCancelled]);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return redirect(`/not-found`);
  }

  const cancellable = isStreamCancellable(data.end_date, data.cancellable_date);
  const cancelled = isStreamCancelledStatus(
    data.end_date,
    data.cancellable_date,
    data.is_cancelled,
  );

  const amount = formatUnits(data.amount, data.token.decimals);
  const withdraw = formatUnits(data.withdrawn, data.token.decimals);

  const isSender = address === data.sender;
  const isReceiver = address === data.receiver;

  const receiverAmount = new BN(
    formatUnits(cancelAmounts.receiverAmount.toString(), data.token.decimals),
  ).toFixed(3);

  const mainTitle = (
    <div className="w-full flex justify-between items-center pb-2 sm:hidden">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">
        {data.is_vesting ? 'Vesting' : 'Stream'} #{data.id}
      </h1>
      <CStreamStatusButton
        type={data.status}
        isCancelled={data.is_cancelled}
        isStreamCancelled={isStreamCancelled}
      />
    </div>
  );
  const symbol = data.token.symbol === 'native' ? 'XLM' : data.token.symbol;

  return (
    <div className="w-full flex mobile:overflow-auto gap-4 md:gap-2 md:px-2 h-[87vh] 2xl:h-[69vh] 3xl:h-[43vh] 4xl:h-[26vh] md:h-[83vh] sm:flex-col sm:w-[90%] sm:m-auto">
      <div className="w-full flex justify-between items-center desktop:hidden lg:hidden xl:hidden md:hidden px-1 mt-8">
        <h1 className="text-[24px] text-midnightBlue pl-2">
          {data.is_vesting ? 'Vesting' : 'Stream'} #{data.id}
        </h1>
        <CStreamStatusButton
          className="!py-1 !px-3"
          type={data.status}
          isCancelled={data.is_cancelled}
          isStreamCancelled={isStreamCancelled}
        />
      </div>
      <CPageCard
        divider
        borderStatus="bordered"
        title={mainTitle}
        className="w-full px-6 sm:px-2 py-[15px] h-full md:!w-[100%] md:px-3 mobile:min-h-[560px]"
        childrenClassName="!pl-0"
        dividerResponsiveClassName="sm:hidden"
      >
        <section className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6 mt-8">
            <StreamIcon sender={isSender} receiver={isReceiver} streamStatus={data.status} />
          </div>

          <DynamicStreamedAmount
            token={symbol}
            streamAmount={isStreamCancelled ? receiverAmount : sendLockupAmount.toFixed(3)}
            isCancelled={data.is_cancelled}
            isVesting={data.is_vesting}
          />

          <BlueCard
            setIsOpenCancelModal={setIsOpenCancelModal}
            streamedAmount={sendLockupAmount.toString()}
            sender={data.sender}
            flowRate={data.rate}
            startDate={data.start_date}
            endDate={data.end_date}
            amount={amount}
            token={symbol}
            isStreamCancelled={isStreamCancelled}
            isCancelable={cancellable}
            isSender={isSender}
            id={data.id}
            isVesting={data.is_vesting}
          />
        </section>
      </CPageCard>

      <div className="w-full sm:pb-[100px]">
        {data && <SummaryFields isCancellable={cancellable} data={data} />}

        {isSender && (
          <SenderStatusCard
            amount={amount}
            startDate={data.start_date}
            endDate={data.end_date}
            cliffDate={data.cliff_date}
            rate={data.rate.toString()}
            isCancelled={data.is_cancelled}
            withdrawn={withdraw}
            isCancelable={cancelled}
            id={data.id}
            token={data.token}
            setCancelAmount={setCancelAmounts}
            cancelAmount={cancelAmounts}
            isStreamCancelled={isStreamCancelled}
            setIsOpenCancelModal={setIsOpenCancelModal}
            isOpenCancelModal={isOpenCancelModal}
            operationType={operationType}
            isVesting={data.is_vesting}
          />
        )}

        {isReceiver && (
          <ReceiverStatusCard
            stream={data}
            token={symbol}
            withdrawnAmount={withdrawnAmount}
            setWithdrawnAmount={setWithdrawnAmount}
            decimalToken={data.token.decimals}
            operationType={operationType}
          />
        )}
      </div>
    </div>
  );
};

export default StreamDetails;
