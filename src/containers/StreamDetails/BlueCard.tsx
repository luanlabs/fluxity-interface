import { useState } from 'react';
import Image from 'next/image';

import BN from 'src/utils/BN';
import CButton from 'src/components/CButton';
import CCard from 'src/components/CCard';
import toast from 'src/components/CToast';
import copyText from 'src/utils/copyText';
import { numberToRate } from 'src/utils/rates';
import ShareModal from 'src/containers/ShareModal';
import { shortenAddress } from 'src/utils/shortenAddress';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';

import StreamProgress from './StreamProgress';

import copyLogo from '/public/images/whiteCopy.svg';
import shareLogo from '/public/images/share.svg';

interface BlueCardProps {
  sender: string;
  flowRate: number;
  startDate: number;
  endDate: number;
  amount: string;
  token: string;
  streamedAmount: string;
  onCopyClick?: () => void;
  setIsOpenCancelModal: (_: boolean) => void;
  isStreamCancelled: boolean;
  isCancelable: boolean;
  isSender: boolean;
  id: string;
}

const BlueCard = ({
  sender,
  flowRate,
  startDate,
  endDate,
  amount,
  streamedAmount,
  token,
  setIsOpenCancelModal,
  isCancelable,
  isStreamCancelled,
  isSender,
  id,
}: BlueCardProps) => {
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const handleCopy = () => {
    copyText(sender);
    toast('success', 'Sender address copied to clipboard');
  };

  const streamDuration = new BN(endDate).minus(startDate);
  const rate = new BN(flowRate);
  const calculateFlowRate = new BN(amount).times(rate).div(streamDuration);
  const flowRateToNumber = Math.round(Number(calculateFlowRate.toString()));

  const handleCancelClick = () => {
    setIsOpenCancelModal(true);
  };

  const completionPercentage = calculateCompletionPercentage(
    startDate,
    endDate,
    amount,
    streamedAmount,
  );

  const shareHandle = () => {
    setIsOpenShareModal(true);
  };

  return (
    <div className="w-[420px] sm:w-full mt-[32px]">
      <CCard
        className="flex flex-col rounded-[20px] justify-center items-center w-full h-full px-3 py-4"
        bgColor="#3A21D4"
        borderColor="rgba(0, 0, 0, 0.10)"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center h-12 w-[53px] bg-darkOrchid text-white text-base px-2 py-2.5 rounded-[9px]">
            {completionPercentage}%
          </div>

          <div className="w-[85%]">
            <StreamProgress percent={completionPercentage} />
          </div>
        </div>

        <div className="flex justify-between w-full mt-2 text-white overflow-hidden whitespace-nowrap items-center bg-darkOrchid h-[56px] sm:h-10 px-4 text-base rounded-[10px]">
          <span>Sender</span>

          <div className="flex">
            <span>{shortenAddress(sender, 5)}</span>
            <Image
              src={copyLogo}
              alt="logo"
              width={20}
              height={20}
              className="ml-2 cursor-pointer"
              onClick={handleCopy}
            />
          </div>
        </div>

        <p className="text-white text-base mt-[29px]">
          {flowRateToNumber} {token} / {numberToRate(flowRate)}
        </p>
        <CButton
          variant="simple"
          color="blue"
          content="Share"
          logo={shareLogo}
          onClick={shareHandle}
          className="mt-3 !rounded-[10px]"
        />
      </CCard>
      {isSender && (
        <div className="w-full flex justify-center items-center desktop:hidden">
          <CButton
            variant="simple"
            color="white"
            content="Cancel Stream"
            onClick={handleCancelClick}
            disabled={!isCancelable || isStreamCancelled}
            className={`mt-3 !rounded-[10px] border-none ${
              (!isCancelable || isStreamCancelled) && '!text-softGray'
            }`}
          />
        </div>
      )}

      <ShareModal isOpenModal={isOpenShareModal} setIsOpenModal={setIsOpenShareModal} id={id} />
    </div>
  );
};

export default BlueCard;
