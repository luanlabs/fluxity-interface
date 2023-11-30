import Image from 'next/image';

import CButton from 'src/components/CButton';
import CCard from 'src/components/CCard';
import toast from 'src/components/CToast';
import copyText from 'src/utils/copyText';
import { shortenAddress } from 'src/utils/shortenAddress';
import { calculateCompletionPercentage } from 'src/utils/calculateCompletionPercentage';

import StreamProgress from './StreamProgress';

import copyLogo from '/public/images/whiteCopy.svg';
import shareLogo from '/public/images/share.svg';
import { calculateStreamAmounts } from 'src/utils/calculateStreamAmount';
import { numberToRate } from 'src/utils/rates';

interface BlueCardProps {
  sender: string;
  flowRate: number;
  startDate: number;
  endDate: number;
  onClick?: () => void;
  onCopyClick?: () => void;
}

const BlueCard = ({ sender, flowRate, startDate, endDate, onClick }: BlueCardProps) => {
  const handleCopy = () => {
    copyText(sender);
    toast('success', 'Sender address copied to clipboard');
  };

  const completionPercentage = calculateCompletionPercentage(startDate, endDate);

  return (
    <div className="w-[420px] mt-[32px]">
      <CCard
        className="flex flex-col rounded-[20px] justify-center items-center w-full h-full px-3 py-4"
        bgColor="royalBlue"
        borderColor="rgba(0, 0, 0, 0.10)"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center h-12 w-[53px] bg-darkOrchid text-white text-base px-2 py-2.5 rounded-[9px]">
            {completionPercentage}%
          </div>

          <div className="w-[85%]">
            <StreamProgress precent={completionPercentage} />
          </div>
        </div>

        <div className="flex justify-between w-full mt-2 text-white overflow-hidden whitespace-nowrap items-center bg-[#442cd6] h-10 px-4 text-base rounded-[10px]">
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

        <p className="text-white text-base mt-[29px]">{numberToRate(flowRate)}</p>
        <CButton
          variant="simple"
          color="blue"
          content="Share"
          logo={shareLogo}
          onClick={onClick}
          className="mt-3"
        />
      </CCard>
    </div>
  );
};

export default BlueCard;
