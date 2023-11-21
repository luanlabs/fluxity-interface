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
      <div className="flex">
        <span>{value}</span>
        {logo && <Image src={logo} alt="logo" width={15} height={15} className="ml-2" />}
      </div>
    </li>
  );
};

export default CSummaryField;
