import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import detailsLogo from 'public/images/summary.svg';

interface CLabelProps {
  details?: string;
  label?: string;
  htmlFor?: string;
  className?: string;
}

const CLabel = ({ label, details, htmlFor, className }: CLabelProps) => {
  return (
    <div className={cn('flex items-start ml-1', className)}>
      <label
        htmlFor={htmlFor}
        className="text-slate-900 text-lg font-normal mb-2 flex"
      >
        {label}
        {details && (
          <Image
            src={detailsLogo}
            alt="search"
            className="ml-2 mb-px"
            title={details}
          />
        )}
      </label>
    </div>
  );
};

export default CLabel;
