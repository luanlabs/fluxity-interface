import Image from 'next/image';

import CModal from 'src/components/CModal';
import CButton from 'src/components/CButton';
import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import { shortenAddress } from 'src/utils/shortenAddress';

import successLogo from 'public/images/successBlack.svg';
import hashLogo from 'public/images/explore.svg';

interface CreateStreamConfirmModal {
  hash: string;
  from: string;
  to: string;
  amount: string;
  onClick: () => void;
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
}

const CreateStreamConfirmModal = ({
  hash,
  from,
  to,
  amount,
  onClick,
  isOpen,
  setIsOpen,
}: CreateStreamConfirmModal) => {
  return (
    <div>
      <CModal title="" isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={successLogo} width={0} height={0} alt="ok" />
          <h1 className="text-[24px] font-medium mt-[24px] tracking-wide text-center">
            You can now complete your transaction.
          </h1>

          <CPageCard className="px-3 py-4 w-[80%] mt-6 ">
            <ul className="grid gap-2 text-midnightBlue">
              <li className="flex justify-between w-full whitespace-nowrap overflow-hidden text-clip items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
                <span>Approval TX</span>
                <div className="flex">
                  <Image src={hashLogo} alt="logo" width={20} height={20} className="mr-2" />

                  <span className="w-full text-right">{hash && shortenAddress(hash, 5)}</span>
                </div>
              </li>

              <li className="flex justify-between w-full whitespace-nowrap overflow-hidden text-clip items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
                <span>From</span>
                <div className="flex">
                  <span className="w-full text-right">{from && shortenAddress(from, 5)}</span>
                </div>
              </li>

              <li className="flex justify-between w-full whitespace-nowrap overflow-hidden text-clip items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
                <span>To</span>
                <div className="flex">
                  <span className="w-full text-right">{to && shortenAddress(to, 5)}</span>
                </div>
              </li>
            </ul>
          </CPageCard>

          <CCard
            bgColor="#F5EBFF"
            borderColor="#BE7CFF"
            className={
              'flex justify-between items-center w-full text-richLavender mb-4 h-14 mt-4 px-[10px] text-lg'
            }
          >
            <p className="w-full">Total Amount</p>
            <p className="font-medium w-[80%] text-clip overflow-hidden text-right">{amount}</p>
          </CCard>
          <CButton
            type="submit"
            variant="form"
            content="Create Stream"
            fill="#fff"
            className="!bg-darkBlue text-white w-full"
            onClick={onClick}
          />
        </div>
      </CModal>
    </div>
  );
};

export default CreateStreamConfirmModal;
