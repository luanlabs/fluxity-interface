import React, { useState } from 'react';
import cn from 'classnames';

import DetailLogo from 'src/assets/detail';
import CTooltip from 'src/components/CTooltip';

interface CLabelProps {
  tooltipDetails?: string;
  label?: string;
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
  tooltipTitle: string;
}

const CLabel = ({
  label,
  tooltipDetails,
  htmlFor,
  className,
  disabled,
  tooltipTitle,
}: CLabelProps) => {
  return (
    <div className={cn('flex items-start ml-1 text-midnightBlue', className)}>
      <label htmlFor={htmlFor} className="text-lg font-normal mb-2 flex">
        {label}
        {tooltipDetails && (
          <CTooltip text={tooltipDetails} TooltipTitle={tooltipTitle}>
            <div className="ml-2">
              <DetailLogo fill={disabled ? '#817fa0' : '#050142'} />
            </div>
          </CTooltip>
        )}
      </label>
    </div>
  );
};

export default CLabel;
