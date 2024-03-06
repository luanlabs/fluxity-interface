import { getNetwork } from '@stellar/freighter-api';
import { useEffect, useState } from 'react';

const useLoadUserNetwork = () => {
  const [currentNetwork, setCurrentNetwork] = useState('FUTURENET');

  useEffect(() => {
    const fetchNetwork = () => {
      getNetwork().then((network: any) => {
        setCurrentNetwork(network);
      });
    };

    const intervalId = setInterval(fetchNetwork, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentNetwork;
};

export default useLoadUserNetwork;
