import { useEffect } from 'react';

import logger from 'src/utils/logger';
import getServer from 'src/utils/soroban/getServer';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { loadAccount, hasTestnetTokens } from 'src/reducers/user';

import { useAppDispatch } from './useRedux';

const useLoadUserInfo = (address: string, passPhrase: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) {
        return;
      }

      const { horizon: server } = getServer(passPhrase);

      try {
        const info = await server.loadAccount(address);

        dispatch(loadAccount(info));
      } catch (error) {
        // A 404 here is expected for wallets that have never been funded.
        logger.debug('Unable to load Horizon account (it may be unfunded)', error);
      }

      try {
        const isMinted = await getAlreadyMinted(address);

        if (isMinted) {
          dispatch(hasTestnetTokens());
        }
      } catch (error) {
        logger.debug('Failed to check testnet mint status', error);
      }
    };

    fetchData();
  }, [dispatch, address, passPhrase]);
};

export default useLoadUserInfo;
