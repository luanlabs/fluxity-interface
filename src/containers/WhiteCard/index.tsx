import React from 'react';

import CCard from '../../components/CCard';

const WhiteCard = () => {
  return (
    <div className="w-[329px]">
      <CCard
        className="flex flex-col justify-between w-full h-full px-3 py-4"
        bgColor="#fff"
        borderColor="rgba(0, 0, 0, 0.10)"
      ></CCard>
    </div>
  );
};

export default WhiteCard;
