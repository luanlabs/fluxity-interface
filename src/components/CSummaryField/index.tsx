import Image from 'next/image';

export type CSummarySize = 'large' | 'normal';

interface CSummaryFieldProps {
  label: string;
  logo?: string;
  value: string | JSX.Element;
  fieldSize: CSummarySize;
}

const CSummaryField = ({ label, logo, value, fieldSize }: CSummaryFieldProps) => {
  return (
    <li
      className={`flex justify-between w-full overflow-hidden whitespace-nowrap items-center bg-alabaster ${
        fieldSize === 'large' ? 'h-[56px]' : 'h-10'
      }  px-4 text-base rounded-[10px]`}
    >
      <span>{label}</span>
      <div className="flex items-center">
        <span>{value}</span>
        {logo && <Image src={logo} alt="logo" width={21} height={20} className="ml-2" />}
      </div>
    </li>
  );
};

export default CSummaryField;
