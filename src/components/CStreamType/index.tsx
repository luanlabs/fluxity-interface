import React from 'react';

import SendIcon from 'src/svgs/SendIcon';
import ReceiveIcon from 'src/svgs/ReceiveIcon';

import capitalize from 'src/utils/capitalizeFirstLetter';

type CStreamTypeProps = {
  type: 'receive' | 'send';
};

const CStreamType = ({ type }: CStreamTypeProps) => {
  return (
    <div
      className={`inline-flex justify-center items-center gap-2 p-[10px] select-none rounded-xl ${
        type === 'receive'
          ? 'bg-paleMint text-forestGreen'
          : 'bg-paleCyan text-royalBlue mr-5'
      }`}
    >
      <span>{type === 'receive' ? <ReceiveIcon /> : <SendIcon />}</span>
      <span className="gap-2"> {capitalize(type)} Stream</span>
    </div>
  );
};

export default CStreamType;
