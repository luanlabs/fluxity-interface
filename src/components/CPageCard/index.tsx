import React from 'react';

import CCard from '../CCard';

const CPageCard = () => {
  return (
    <CCard
      className="flex justify-between w-[1000px] max-w-full px-8 py-5"
      bgColor="#fff"
      borderColor="rgba(5, 1, 66, 0.10)"
    >
      <div className="w-full pb-2 border-b border-[rgba(5, 1, 66, 0.10)]">{title}</div>
    </CCard>
  );
};

export default CPageCard;

const a = <h1 className="text-[24px] text-midnightblue">create</h1>;
<CPageCard title={a}></CPageCard>;
