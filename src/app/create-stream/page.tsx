import React from 'react';
import { Metadata } from 'next';

import CreateStreamMainCard from 'src/containers/CreateStreamMainCard';

export const metadata: Metadata = {
  title: 'Fluxity - Create Stream',
  description:
    'Create a token stream on Fluxity’s intuitive platform to enable continuous, time-based cryptocurrency transactions on the Stellar network.',
  keywords:
    'create token stream, cryptocurrency, Stellar, time-based payment, automated transactions',
};

const CreateStream = () => {
  return <CreateStreamMainCard />;
};

export default CreateStream;
