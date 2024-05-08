'use client';
import React, { useState } from 'react';

import Transactions from '../Transactions';
import AllStreamsCard from '../AllStreamsCard';
import CPageCard from 'src/components/CPageCard';
import { StreamStatus } from 'src/components/CStreamStatus';
import { IFilterTokens } from 'src/constants/types';

import Filters from './Filters';

const ActivityContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus>(StreamStatus.ONGOING);
  const [filteredValues, setFilteredValues] = useState<IFilterTokens>({
    tokens: [],
    showReceivedStreams: true,
    showSentStreams: true,
  });

  return (
    <CPageCard
      divider
      borderStatus="borderless"
      className="flex py-[15px] px-5 !h-full mobile:relative"
      childrenClassName="h-full overflow-hidden !px-0"
      dividerResponsiveClassName="mobile:border-none"
      title={<h1 className="text-2xl text-midnightBlue mb-[10px] mt-1 pl-2">Activity History</h1>}
    >
      <div style={{ flexFlow: 'column' }} className="h-full flex mobile:!h-[calc(100vh-216px)]">
        <AllStreamsCard />

        <Filters
          setSearchValue={setSearchValue}
          filteredValues={filteredValues}
          setFilteredValues={setFilteredValues}
          setSelectedStatus={setSelectedStatus}
        />

        <div style={{ flex: '1 1 auto' }} className="relative overflow-scroll">
          <Transactions
            searchValue={searchValue}
            filteredValues={filteredValues}
            selectedStatus={selectedStatus}
          />
        </div>
      </div>
    </CPageCard>
  );
};

export default ActivityContainer;
