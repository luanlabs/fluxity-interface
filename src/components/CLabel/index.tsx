import React, { useState } from 'react';
import cn from 'classnames';

import DetailLogo from 'src/assets/detail';
import CToolTip from 'src/components/CToolTip';

interface CLabelProps {
  details?: string;
  label?: string;
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
  toolTipTitle: string;
}

const CLabel = ({ label, details, htmlFor, className, disabled, toolTipTitle }: CLabelProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn('flex items-start ml-1 text-midnightBlue', className)}>
      <label htmlFor={htmlFor} className="text-lg font-normal mb-2 flex ">
        {label}
        {details && (
          <CToolTip visible={visible} setVisible={setVisible} text={details} title={toolTipTitle}>
            <div className="ml-2 mb-px">
              <DetailLogo fill={disabled ? '#817fa0' : '#050142'} />
            </div>
          </CToolTip>
        )}
      </label>
    </div>
  );
};

export default CLabel;
