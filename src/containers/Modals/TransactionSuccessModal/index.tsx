import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CModal from 'src/components/CDialog';
import CButton from 'src/components/CButton';
import { shortenAddress } from 'src/utils/shortenAddress';

import successLogo from 'public/images/success-normal-size.svg';
import exploreLogo from 'public/images/explore.svg';

interface TransactionSuccessModal {
  stream: { hash: string; id: string };
  isOpen: boolean;
  title?: string;
  setIsOpen: (_: boolean) => void;
  closeOnClick: () => void;
  explorerAddress: string;
}

const TransactionSuccessModal = ({
  stream,
  isOpen,
  title,
  setIsOpen,
  closeOnClick,
  explorerAddress,
}: TransactionSuccessModal) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lockup/${stream.id}`);
  };

  return (
    <div>
      <CModal isOpen={isOpen} setIsOpen={setIsOpen} width="396px">
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={successLogo} width={0} height={0} alt="ok" className="mt-8" />
          <h1 className="text-[24px] font-med text-midnightBlue antialiased  mt-[24px] tracking-[0.5px] text-center">
            {title && title}
          </h1>
          <p className="text-[18px] text-center mt-[32px]">{shortenAddress(stream.hash, 5)}</p>
          <Link
            href={`${explorerAddress}/transactions/${stream.hash}`}
            target="_blank"
            className="w-full mt-[32px]"
          >
            <CButton
              content="See in explorer"
              variant="simple"
              color="outline"
              logo={exploreLogo}
              className="h-[56px] w-full  text-base"
            />
          </Link>

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
              onClick={handleClick}
            />
          </div>
        </div>
      </CModal>
    </div>
  );
};

export default TransactionSuccessModal;
