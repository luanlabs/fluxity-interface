import React from 'react';

import CPageCard from '../../components/CPageCard';

const CreateStreamCard = () => {
  const CreateStreamTitle = (
    <h1 className="text-[24px] text-midnightblue mb-2 pl-2">Create Stream</h1>
  );
  return (
    <div className="w-[800px]">
      <CPageCard title={CreateStreamTitle} className="px-[33px] py-[15px]" divider>
        ss
      </CPageCard>
    </div>
  );
};

export default CreateStreamCard;
