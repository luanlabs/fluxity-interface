import React from 'react';

import CCard from '../../components/CCard';

const CreateStream = () => {
  return (
    <div className="w-[800px]">
      <CCard
        className="flex justify-between w-full h-full px-8 py-5"
        bgColor="#fff"
        borderColor="rgba(5, 1, 66, 0.10)"
      >
        <div className="w-full pb-2 border-b border-[rgba(5, 1, 66, 0.10)]">
          <h1 className="text-[24px] text-midnightblue">Create Stream</h1>
        </div>
      </CCard>
    </div>
  );
};

export default CreateStream;
