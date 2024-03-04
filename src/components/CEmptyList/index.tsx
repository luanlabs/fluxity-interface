import Image from 'next/image';

import noStreams from 'public/images/noStreams.svg';

interface CEmptyListProps {
  status: string;
  description: string;
}

const CEmptyList = ({ status, description }: CEmptyListProps) => {
  return (
    <div className="flex flex-col justify-center h-full items-center w-full select-none desktop:min-h-[200px]">
      <Image src={noStreams} alt="icon" />
      <p className="font-medium text-2xl text-[#8F8F8F]"> {status} </p>
      <p className="mt-2 font-medium text-base text-[#8F8F8F] leading-4 mobile:text-center">
        {description}
      </p>
    </div>
  );
};

export default CEmptyList;
