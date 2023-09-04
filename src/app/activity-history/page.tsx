'use client';
import React from 'react';
import CPageCard from 'src/components/CPageCard';
import ActivityHistoryTable from 'src/containers/ActivityHistoryTable';
import AllStreamCard from 'src/containers/AllStreamCard';

const ActivityHistory = () => {
  return (
    <CPageCard
      title={
        <h1 className="text-[24px] text-midnightblue mb-1 pl-2">
          Activity History
        </h1>
      }
      divider
      className="py-[23px] px-[27px]"
    >
      <AllStreamCard />
      <ActivityHistoryTable />
    </CPageCard>
  );
};

export default ActivityHistory;
