import React from 'react';

import CCard from 'src/components/CCard';

const BlueCard = () => {
  return (
    <div className="w-[385px] h-[182px]">
      <CCard
        className="flex flex-col justify-between w-full h-full px-3 py-4"
        bgColor="royalBlue"
        borderColor="rgba(0, 0, 0, 0.10)"
      >
        Blue card
      </CCard>
    </div>
  );
};

export default BlueCard;
