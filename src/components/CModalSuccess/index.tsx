import Image from 'next/image';
import Link from 'next/link';

import CButton, { CButtonVariantType } from 'src/components/CButton';
import { shortenAddress } from 'src/utils/shortenAddress';
import CPageCard from 'src/components/CPageCard';
import CTooltip from 'src/components/CTooltip';
import CModal from 'src/components/CModal';
import DetailLogo from 'src/assets/detail';
import CCard from 'src/components/CCard';

import CSummaryField from '../CSummaryField';

import successGreenLogo from 'public/images/success-normal-size.svg';
import successLogo from 'public/images/successBlack.svg';
import exploreLogo from 'public/images/explore.svg';

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
  explorerLink?: string;
  tooltipTitle: string;
  tooltipDetails?: string;
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
  explorerLink,
  successLogoColor,
  tooltipTitle,
  tooltipDetails,
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

          <h1 className="text-[24px] font-medium mt-[24px] mb-4 tracking-wide text-center">
            {title}
          </h1>

          {streamId ||
            from ||
            to ||
            (amountStreamed && (
              <CPageCard className="px-3 py-4 w-[80%] mt-6">
                <ul className="grid gap-2 text-midnightBlue">
                  {streamId && <CSummaryField label="Stream" value={streamId} fieldSize="normal" />}
                  {from && (
                    <CSummaryField
                      label="From"
                      value={shortenAddress(from, 5)}
                      fieldSize="normal"
                    />
                  )}
                  {to && (
                    <CSummaryField label="To" value={shortenAddress(to, 5)} fieldSize="normal" />
                  )}
                  {amountStreamed && (
                    <CSummaryField
                      label="Amount Streamed"
                      value={amountStreamed}
                      fieldSize="normal"
                    />
                  )}
                </ul>
              </CPageCard>
            ))}

          {explorerLink && (
            <Link href={explorerLink} target="_blank" className="w-full mt-[32px] mb-4">
              <CButton
                content="See in explorer"
                variant="simple"
                color="outline"
                logo={exploreLogo}
                className="h-[56px] w-full text-base"
              />
            </Link>
          )}

          {amount && (
            <CCard
              bgColor="#F5EBFF"
              borderColor="#BE7CFF"
              className={
                'flex justify-between items-center w-full text-richLavender h-14 px-[10px] text-lg'
              }
            >
              <div className="flex items-center">
                <p className="w-full font-medium">{amountTitle}</p>
                {tooltipDetails && (
                  <CTooltip text={tooltipDetails} title={tooltipTitle}>
                    <div className=" ml-2">
                      <DetailLogo fill={'#9245de'} />
                    </div>
                  </CTooltip>
                )}
              </div>

              <p className="font-medium w-[80%] text-clip overflow-hidden text-right">
                {amount}
                {token && <span className="ml-1">{token}</span>}
              </p>
            </CCard>
          )}

          <CButton
            type="submit"
            variant={buttonVariant}
            content={buttonText}
            fill={logoColor}
            className="!bg-darkBlue text-white text-center w-full mt-4"
            onClick={onClick}
          />
        </div>
      </CModal>
    </div>
  );
};

export default CModalSuccess;
