import React from 'react';
import { Metadata } from 'next';

import StreamDetails from 'src/containers/StreamDetails';

export const metadata: Metadata = {
  title: 'Fluxity - StreamDetails',
  description:
    'Create a token stream on Fluxity’s intuitive platform to enable continuous, time-based cryptocurrency transactions on the Stellar network.',
  keywords:
    'create token stream, cryptocurrency, Stellar, time-based payment, automated transactions',
};

const StreamDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string; network: string }>;
}) => {
  const { id, network } = await params;

  return <StreamDetails id={id} network={network} />;
};

export default StreamDetailsPage;
