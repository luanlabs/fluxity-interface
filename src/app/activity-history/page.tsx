import React from 'react';
import { Metadata } from 'next';

import CPageCard from 'src/components/CPageCard';
import Transactions from 'src/containers/Transactions';
import AllStreamCard from 'src/containers/AllStreamCard';

export const metadata: Metadata = {
  title: 'Fluxity - Activity History',
  description:
    'Track your past, present, and future token streaming activities on the Stellar network with Fluxity’s comprehensive activity history feature.',
  keywords:
    'token streaming history, transaction tracking, Stellar network, digital finance, stream monitoring',
};

const ActivityHistory = () => {
  return (
    <CPageCard
      divider
      scroll
      borderStatus="borderless"
      className="py-[15px] px-5 mobile:h-[85vh]"
      dividerResponsiveClassName="mobile:border-none"
      title={<h1 className="text-2xl text-midnightBlue mb-[10px] mt-1 pl-2">Activity History</h1>}
    >
      <AllStreamCard />
      <Transactions />
    </CPageCard>
  );
};

export default ActivityHistory;
