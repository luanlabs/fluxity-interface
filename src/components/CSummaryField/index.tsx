import Image from 'next/image';

interface CSummaryFieldProps {
  label: string;
  logo?: string;
  value: string;
}

const CSummaryField = ({ label, logo, value }: CSummaryFieldProps) => {
  return (
    <li className="flex justify-between w-full overflow-hidden whitespace-nowrap items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
      <span>{label}</span>
      <div className="flex items-center">
        <span>{value}</span>
        {logo && <Image src={logo} alt="logo" width={21} height={20} className="ml-2" />}
      </div>
    </li>
  );
};

export default CSummaryField;
