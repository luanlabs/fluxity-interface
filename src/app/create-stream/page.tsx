import React from 'react';
import { Metadata } from 'next';

import CreateStreamMainCard from 'src/containers/CreateStreamMainCard';

export const metadata: Metadata = {
  title: 'Fluxity - Create Stream',
  description: '',
};

const CreateStream = () => {
  return <CreateStreamMainCard />;
};

export default CreateStream;
