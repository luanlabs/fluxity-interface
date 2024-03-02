import React from 'react';

import useLoadTokens from 'src/hooks/useLoadTokens';
import { useAppSelector } from 'src/hooks/useRedux';
import useLoadStreams from 'src/hooks/useLoadStreams';
import useLoadUserInfo from 'src/hooks/useLoadUserInfo';
import useConnectWallet from 'src/hooks/useConnectWallet';
import useLoadTokenBalances from 'src/hooks/useLoadTokenBalances';

const AppDataFetch = () => {
  const address = useAppSelector((state) => state.user.address);

  useConnectWallet();
  useLoadUserInfo(address);
  useLoadTokens();
  useLoadTokenBalances(address);
  useLoadStreams(address);

  return <></>;
};

export default AppDataFetch;
