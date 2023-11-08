import React from 'react';
import { Metadata } from 'next';

import ActivityHistoryContainer from 'src/containers/ActivityHistoryContainer';

export const metadata: Metadata = {
  title: 'Fluxity - Activity History',
  description: 'Your command center to create, monitor, and manage your token streams.',
};

const ActivityHistory = () => {
  return <ActivityHistoryContainer />;
};

export default ActivityHistory;
