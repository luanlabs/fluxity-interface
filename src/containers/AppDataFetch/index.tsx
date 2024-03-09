import React, { useEffect, useState } from 'react';

import CModal from 'src/components/CModal';
import useLoadTokens from 'src/hooks/useLoadTokens';
import { useAppSelector } from 'src/hooks/useRedux';
import useLoadStreams from 'src/hooks/useLoadStreams';
import useLoadUserInfo from 'src/hooks/useLoadUserInfo';
import useConnectWallet from 'src/hooks/useConnectWallet';
import useLoadTokenBalances from 'src/hooks/useLoadTokenBalances';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import ChangeNetworkModal from '../ChangeNetworkModal';

const AppDataFetch = () => {
  const [shouldModalOpen, setShouldModalOpen] = useState(false);
  const address = useAppSelector((state) => state.user.address);

  useConnectWallet();
  useLoadUserInfo(address);
  const currentNetwork = useLoadUserNetwork();
  useLoadTokens();
  useLoadTokenBalances(address);
  useLoadStreams(address);

  useEffect(() => {
    setShouldModalOpen(currentNetwork !== 'FUTURENET');
  }, [currentNetwork]);

  return (
    <>
      <CModal isOpen={shouldModalOpen} setIsOpen={setShouldModalOpen} isSticky>
        <ChangeNetworkModal />
      </CModal>
    </>
  );
};

export default AppDataFetch;
