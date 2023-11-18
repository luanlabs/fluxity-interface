import cn from 'classnames';
interface CStreamDetailsStatusProps {
  type: 'Active' | 'Expired' | 'Pending';
}

const CStreamDetailsStatus = ({ type }: CStreamDetailsStatusProps) => {
  let statusStyle;
  if (type === 'Active') {
    statusStyle = 'border-forestGreen bg-paleMint text-forestGreen';
  } else if (type === 'Expired') {
    statusStyle = 'bg-lightGrayishBlue border-darkGrayishTeal text-darkGrayishTeal';
  } else if (type === 'Pending') {
    statusStyle = 'bg-brightYellow border-burntOrange text-burntOrange';
  }

  return <div className={cn('border rounded-[63px] px-4 py-2', statusStyle)}>{type}</div>;
};

export default CStreamDetailsStatus;
