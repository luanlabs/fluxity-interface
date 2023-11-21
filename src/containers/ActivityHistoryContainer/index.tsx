import React from 'react';

import CPageCard from 'src/components/CPageCard';
import Transactions from 'src/containers/Transactions';
import AllStreamCard from 'src/containers/AllStreamCard';

const ActivityHistoryContainer = () => {
  return (
    <CPageCard
      title={<h1 className="text-2xl text-midnightBlue mb-[10px] mt-1 pl-2">Activity History</h1>}
      className="py-[15px] px-5"
      divider
      scroll
    >
      <AllStreamCard />
      <Transactions />
    </CPageCard>
  );
};

export default ActivityHistoryContainer;
