import Image from 'next/image';

export type CSummarySize = 'large' | 'normal';

interface CSummaryFieldProps {
  label: string;
  logo?: string;
  value: string | JSX.Element;
  fieldSize: CSummarySize;
  hideDivider?: boolean;
}

const CSummaryField = ({ label, logo, value, fieldSize, hideDivider }: CSummaryFieldProps) => {
  return (
    <li
      className={`flex sm:flex-col desktop:items-center w-full overflow-hidden whitespace-nowrap list-none bg-alabaster sm:bg-transparent px-4 text-base md:text-[14.5px] rounded-[10px] `}
    >
      <div
        className={`flex justify-between items-center w-full ${
          fieldSize === 'large' ? 'h-[56px] sm:h-10 sm:pb-2' : 'h-10'
        }`}
      >
        <span>{label}</span>
        <div className="flex items-center">
          <span className="sm:font-medium">{value}</span>
          {logo && <Image src={logo} alt="logo" width={21} height={20} className="ml-2" />}
        </div>
      </div>
      {!hideDivider && (
        <hr className="bg-[#E6E6EC] w-[96%] m-auto sm:block desktop:hidden md:hidden xl:hidden" />
      )}
    </li>
  );
};

export default CSummaryField;
