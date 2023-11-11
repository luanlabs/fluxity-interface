'use client';

import React from 'react';
import ClaimTokens from '../ClaimTokens';
import { useAppSelector } from 'src/hooks/useRedux';

const ClaimTokenCard = () => {
  const { address, loading, hasReceivedTokens } = useAppSelector((state) => state.user);

  return address && !loading && !hasReceivedTokens && <ClaimTokens />;
};

export default ClaimTokenCard;
