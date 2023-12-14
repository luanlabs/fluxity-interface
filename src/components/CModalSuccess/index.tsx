import Image from 'next/image';

import CCard from 'src/components/CCard';
import CModal from 'src/components/CModal';
import CButton, { CButtonVariantType } from 'src/components/CButton';
import CPageCard from 'src/components/CPageCard';
import { shortenAddress } from 'src/utils/shortenAddress';

import CSummaryField from '../CSummaryField';

import successLogo from 'public/images/successBlack.svg';
import successGreenLogo from 'public/images/success-normal-size.svg';

export type SuccessColor = 'black' | 'green';

interface CModalSuccess {
  successLogoColor: SuccessColor;
  title: string;
  streamId?: string;
  from?: string;
  to?: string;
  amount: string;
  token?: string;
  amountStreamed?: string;
  amountTitle: string;
  logoColor?: string;
  buttonText: string;
  buttonVariant: CButtonVariantType;
  onClick: () => void;
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
}

const CModalSuccess = ({
  title,
  from,
  to,
  amount,
  streamId,
  token,
  amountStreamed,
  amountTitle,
  logoColor,
  buttonText,
  buttonVariant,
  successLogoColor,
  onClick,
  isOpen,
  setIsOpen,
}: CModalSuccess) => {
  return (
    <div>
      <CModal isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src={successLogoColor === 'black' ? successLogo : successGreenLogo}
            width={0}
            height={0}
            alt="ok"
          />
          <h1 className="text-[24px] font-medium mt-[24px] tracking-wide text-center">{title}</h1>

          <CPageCard className="px-3 py-4 w-[80%] mt-6 ">
            <ul className="grid gap-2 text-midnightBlue">
              {streamId && <CSummaryField label="Stream" value={streamId} fieldSize="normal" />}
              {from && (
                <CSummaryField label="From" value={shortenAddress(from, 5)} fieldSize="normal" />
              )}
              {to && <CSummaryField label="To" value={shortenAddress(to, 5)} fieldSize="normal" />}
              {amountStreamed && (
                <CSummaryField label="Amount Streamed" value={amountStreamed} fieldSize="normal" />
              )}
            </ul>
          </CPageCard>

          <CCard
            bgColor="#F5EBFF"
            borderColor="#BE7CFF"
            className={
              'flex justify-between items-center w-full text-richLavender mb-4 h-14 mt-4 px-[10px] text-lg'
            }
          >
            <p className="w-full font-medium">{amountTitle}</p>
            <p className="font-medium w-[80%] text-clip overflow-hidden text-right">
              {amount}
              {token && <span className="ml-1">{token}</span>}
            </p>
          </CCard>
          <CButton
            type="submit"
            variant={buttonVariant}
            content={buttonText}
            fill={logoColor}
            className="!bg-darkBlue text-white text-center w-full"
            onClick={onClick}
          />
        </div>
      </CModal>
    </div>
  );
};

export default CModalSuccess;
