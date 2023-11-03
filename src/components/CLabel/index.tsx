import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import detailsLogo from 'public/images/summary.svg';
import DetailLogo from 'src/assets/detail';

interface CLabelProps {
  details?: string;
  label?: string;
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
}

const CLabel = ({ label, details, htmlFor, className, disabled }: CLabelProps) => {
  return (
    <div className={cn('flex items-start ml-1 text-midnightBlue', className)}>
      <label htmlFor={htmlFor} className="text-lg font-normal mb-2 flex ">
        {label}
        {details && (
          <div className="ml-2 mb-px" title={details}>
            <DetailLogo fill={disabled ? '#817fa0' : '#050142'} />
          </div>
        )}
      </label>
    </div>
  );
};

export default CLabel;
