import { CButtonKindType, CButtonColorType } from './index';

const buttonCustomStyles = (kind: CButtonKindType, color?: CButtonColorType) => {
  let colorStyles = '';
  if (color === 'orange') {
    colorStyles = 'bg-darkcoral h-[40px] text-[#fff]';
  } else if (color === 'purple') {
    colorStyles = 'bg-richlavender text-[#fff] h-[40px]';
  } else if (color === 'gray') {
    colorStyles = 'bg-lavenderblush border border-midnightblue text-midnightblue';
  } else if (color === 'white') {
    colorStyles = 'bg-[#fff] border border-midnightblue text-midnightblue';
  } else if (color === 'blue') {
    colorStyles = 'bg-blueindigo text-[#fff]';
  } else {
    colorStyles = 'bg-[#fff] text-royalblue !rounded-[11px] h-[36px] !px-3';
  }

  const kindStyles =
    kind === 'simple'
      ? 'rounded-[30px] text-center text-[16px] px-6 h-[44px] flex flex-row justify-center items-center'
      : '!bg-midnightblue rounded-[12px] w-[329px] h-[56px] !text-[#fff] text-[16px] text-center flex justify-center items-center';

  return `${colorStyles} ${kindStyles}`;
};

export default buttonCustomStyles;
