import { getNetworkDetails } from '@stellar/freighter-api';
import { useEffect, useState } from 'react';

import { INetwork } from 'src/constants/types';
import { Testnet } from 'src/constants/networks';

const useLoadUserNetwork = () => {
  const [currentNetwork, setCurrentNetwork] = useState<INetwork>(Testnet);

  useEffect(() => {
    const fetchNetwork = () => {
      getNetworkDetails().then((network: INetwork) => {
        setCurrentNetwork(network);
      });
    };

    const intervalId = setInterval(fetchNetwork, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentNetwork;
};

export default useLoadUserNetwork;
