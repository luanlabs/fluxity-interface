import React from 'react';
import { Metadata } from 'next';

import ActivityContainer from 'src/containers/ActivityContainer';

export const metadata: Metadata = {
  title: 'Fluxity - Activity History',
  description:
    'Track your past, present, and future token streaming activities on the Stellar network with Fluxity’s comprehensive activity history feature.',
  keywords:
    'token streaming history, transaction tracking, Stellar network, digital finance, stream monitoring',
};

const ActivityHistory = () => {
  return <ActivityContainer />;
};

export default ActivityHistory;
