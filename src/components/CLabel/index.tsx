import React from 'react';
import Image from 'next/image';

import detailsLogo from '../../../public/images/summary.svg';

interface CLabelProps {
  details?: string;
  label?: string;
  htmlFor?: string;
}

const CLabel = ({ label, details, htmlFor }: CLabelProps) => {
  return (
    <div className="flex items-start">
      <label
        htmlFor={htmlFor}
        className="text-slate-900 text-lg font-normal leading-[18.78px] mb-[8px] flex"
      >
        {label}
        {details && (
          <Image src={detailsLogo} alt="search" className="ml-2" title={details} />
        )}
      </label>
    </div>
  );
};

export default CLabel;
