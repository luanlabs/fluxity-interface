import Image from 'next/image';

import CModal from 'src/components/CModal';
import CButton from 'src/components/CButton';
import { shortenAddress } from 'src/utils/shortenAddress';

import successLogo from 'public/images/success-normal-size.svg';
import exploreLogo from 'public/images/explore.svg';

interface TransactionSuccessModal {
  hash: string;
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  closeOnClick: () => void;
}

const TransactionSuccessModal = ({
  hash,
  isOpen,
  setIsOpen,
  closeOnClick,
}: TransactionSuccessModal) => {
  return (
    <div>
      <CModal title="" isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={successLogo} width={0} height={0} alt="ok" className="mt-8" />
          <h1 className="text-[24px] font-med text-midnightBlue antialiased  mt-[24px] tracking-[0.5px] text-center">
            Transaction successful
          </h1>
          <p className="text-[18px] text-center mt-[32px]">{hash && shortenAddress(hash, 5)}</p>

          <CButton
            content="See in explorer"
            variant="simple"
            color="outline"
            logo={exploreLogo}
            className="h-[56px] mt-[32px] text-base"
          />

          <div className="flex flex-row items-center justify-end w-full mt-[24px] ">
            <a
              className="mr-8 text-base text-midnightBlue cursor-pointer select-none"
              onClick={closeOnClick}
            >
              Close
            </a>

            <CButton
              content="View Stream Details"
              variant="simple"
              color="blue"
              className="!rounded-[10px] h-[56px] !w-[200px] font-med"
            />
          </div>
        </div>
      </CModal>
    </div>
  );
};

export default TransactionSuccessModal;
