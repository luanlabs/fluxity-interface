import { useEffect, useRef } from 'react';
import { getPublicKey, isConnected } from '@stellar/freighter-api';

import { useAppDispatch } from './useRedux';
import { setAddress } from 'src/reducers/user';

const useConnectWallet = () => {
  const dispatch = useAppDispatch();
  const isFirstTime = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      const connected = await isConnected();

      if (connected && isFirstTime.current) {
        isFirstTime.current = false;
        const address = await getPublicKey();
        dispatch(setAddress(address));
      }
    };

    fetchData();
  }, [dispatch]);
};
export default useConnectWallet;
