import { getNetworkDetails } from '@stellar/freighter-api';
import { useEffect, useState } from 'react';

import { INetwork } from 'src/constants/types';
import { Futurenet } from 'src/constants/networks';

const useLoadUserNetwork = () => {
  const [currentNetwork, setCurrentNetwork] = useState<INetwork>(Futurenet);

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
