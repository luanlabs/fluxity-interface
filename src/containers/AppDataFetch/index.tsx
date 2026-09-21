import React, { useEffect, useState } from 'react';
import { useBlux, useNetwork } from '@bluxcc/react';

import CModal from 'src/components/CModal';
import validateEnv from 'src/constants/env';
import useLoadTokens from 'src/hooks/useLoadTokens';
import useLoadStreams from 'src/hooks/useLoadStreams';
import ChangeNetworkModal from '../ChangeNetworkModal';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const AppDataFetch = () => {
  const [shouldModalOpen, setShouldModalOpen] = useState(false);
  const { user } = useBlux();
  const networkPassphrase = useNetwork();
  const address = user?.address ?? '';
  const network = passPhraseToNetworkDetail(networkPassphrase).network;

  useEffect(() => {
    validateEnv();
  }, []);

  useLoadTokens(network, networkPassphrase, address);
  useLoadStreams(address, network);

  return (
    <>
      <CModal isOpen={shouldModalOpen} setIsOpen={setShouldModalOpen} isSticky width="396px">
        <ChangeNetworkModal />
      </CModal>
    </>
  );
};

export default AppDataFetch;
