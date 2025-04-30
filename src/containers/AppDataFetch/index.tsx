import React, { useEffect, useState } from 'react';

import CModal from 'src/components/CModal';
import useLoadTokens from 'src/hooks/useLoadTokens';
import { useAppSelector } from 'src/hooks/useRedux';
import useLoadStreams from 'src/hooks/useLoadStreams';
import ChangeNetworkModal from '../ChangeNetworkModal';
import useLoadUserInfo from 'src/hooks/useLoadUserInfo';
import useLoadTokenBalances from 'src/hooks/useLoadTokenBalances';

const AppDataFetch = () => {
  const [shouldModalOpen, setShouldModalOpen] = useState(false);
  const address = useAppSelector((state) => state.user.address);
  const currentNetwork = useAppSelector((state) => state.user.network);

  useLoadUserInfo(address, currentNetwork.networkPassphrase);
  useLoadTokens(currentNetwork.network, currentNetwork.networkPassphrase);
  useLoadTokenBalances(address, currentNetwork.networkPassphrase);
  useLoadStreams(address, currentNetwork.network);

  return (
    <>
      <CModal isOpen={shouldModalOpen} setIsOpen={setShouldModalOpen} isSticky width="396px">
        <ChangeNetworkModal />
      </CModal>
    </>
  );
};

export default AppDataFetch;
