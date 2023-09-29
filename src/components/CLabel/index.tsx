import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import detailsLogo from '../../../public/images/summary.svg';

interface CLabelProps {
  details?: string;
  label?: string;
  htmlFor?: string;
  className?: string;
}

const CLabel = ({ label, details, htmlFor, className }: CLabelProps) => {
  return (
    <div className={cn('flex items-start ml-[4px]', className)}>
      <label
        htmlFor={htmlFor}
        className="text-slate-900 text-lg font-normal mb-[8px] flex"
      >
        {label}
        {details && (
          <Image
            src={detailsLogo}
            alt="search"
            className="ml-2 mb-[1px]"
            title={details}
          />
        )}
      </label>
    </div>
  );
};

export default CLabel;
