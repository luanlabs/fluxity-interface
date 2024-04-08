import React from 'react';
import { Metadata } from 'next';

import CreateLockup from 'src/containers/CreateLockup';

export const metadata: Metadata = {
  title: 'Fluxity - Vesting',
  description:
    'Create a token stream on Fluxity’s intuitive platform to enable continuous, time-based cryptocurrency transactions on the Stellar network.',
  keywords:
    'create token stream, cryptocurrency, Stellar, time-based payment, automated transactions',
};

const Vesting = () => {
  return <CreateLockup operationType="vesting" />;
};

export default Vesting;
