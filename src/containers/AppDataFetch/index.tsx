import React, { useEffect, useState } from 'react';

import CModal from 'src/components/CModal';
import { Mainnet, Testnet } from 'src/constants/networks';
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
  const currentNetwork = useLoadUserNetwork();

  useLoadUserInfo(address, currentNetwork.networkPassphrase);
  useLoadTokens();
  useLoadTokenBalances(address, currentNetwork.networkPassphrase);
  useLoadStreams(address);

  useEffect(() => {
    setShouldModalOpen(
      currentNetwork.networkPassphrase !== Mainnet.networkPassphrase &&
        currentNetwork.networkPassphrase !== Testnet.networkPassphrase,
    );
  }, [currentNetwork]);

  return (
    <>
      <CModal isOpen={shouldModalOpen} setIsOpen={setShouldModalOpen} isSticky width="396px">
        <ChangeNetworkModal />
      </CModal>
    </>
  );
};

export default AppDataFetch;
