import { useRouter } from 'next/navigation';

import CButton from 'src/components/CButton';

interface DoubleButtonModalProps {
  stream: { hash: string; id: number };
  closeOnClick: () => void;
  buttonText: string;
  network: string;
}

const DoubleButtonModal = ({
  closeOnClick,
  stream,
  buttonText,
  network,
}: DoubleButtonModalProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${network}/lockup/${stream.id}`);
  };

  return (
    <div className="flex flex-row items-center gap-2 justify-between w-full mt-[24px]">
      <a
        className="w-full h-[56px] flex justify-center items-center text-base text-midnightBlue cursor-pointer select-none"
        onClick={closeOnClick}
      >
        Close
      </a>

      <CButton
        content={buttonText}
        variant="simple"
        color="blue"
        className="!rounded-[10px] w-full h-[56px]"
        onClick={handleClick}
      />
    </div>
  );
};

export default DoubleButtonModal;
