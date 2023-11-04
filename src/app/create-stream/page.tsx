'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/useRedux';
import { getTokenList } from 'src/features/getTokenList';
import CreateStreamMainCard from 'src/containers/CreateStreamMainCard';
import { loadTokens } from 'src/reducers/tokens';

const CreateStream = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getTokenList().then((data) => {
      const mappedTokens = data.data.result.map((token) => {
        return { ...token, balance: '0' };
      });

      dispatch(loadTokens(mappedTokens));
    });
  }, [dispatch]);
  return <CreateStreamMainCard />;
};

export default CreateStream;
