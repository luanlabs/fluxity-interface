import { useRouter } from 'next/navigation';

import CButton from 'src/components/CButton';

interface DoubleButtonModalProps {
  stream: { hash: string; id: number };
  closeOnClick: () => void;
  buttonText: string;
}

const DoubleButtonModal = ({ closeOnClick, stream, buttonText }: DoubleButtonModalProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/stream/${stream.id}`);
  };

  return (
    <div className="flex flex-row items-center justify-end w-full mt-[24px] ">
      <a
        className="mr-8 text-base text-midnightBlue cursor-pointer select-none"
        onClick={closeOnClick}
      >
        Close
      </a>

      <CButton
        content={buttonText}
        variant="simple"
        color="blue"
        className="!rounded-[10px] h-[56px] !w-[200px] font-med"
        onClick={handleClick}
      />
    </div>
  );
};

export default DoubleButtonModal;
