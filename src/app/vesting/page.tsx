import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

import emptyLogo from 'public/images/noStreams.svg';

export const metadata: Metadata = {
  title: 'Fluxity - Vesting',
  description:
    'Create a token stream on Fluxity’s intuitive platform to enable continuous, time-based cryptocurrency transactions on the Stellar network.',
  keywords:
    'create token stream, cryptocurrency, Stellar, time-based payment, automated transactions',
};

const Vesting = () => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <Image src={emptyLogo} width={200} alt="empty" className="select-none" draggable={false} />
      <p className="mt-5 text-3xl font-medium">Coming soon...</p>
    </div>
  );
};

export default Vesting;
