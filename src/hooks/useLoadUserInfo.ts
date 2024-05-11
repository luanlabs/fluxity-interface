import { useEffect } from 'react';

import getServer from 'src/utils/soroban/getServer';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { loadAccount, hasTestnetTokens } from 'src/reducers/user';

import { useAppDispatch } from './useRedux';

const useLoadUserInfo = (address: string, passPhrase: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const { horizon: server } = getServer(passPhrase);

        try {
          const info = await server.loadAccount(address);

          dispatch(loadAccount(info));
        } catch (e) {}

        const isMinted = await getAlreadyMinted(address);

        if (isMinted) {
          dispatch(hasTestnetTokens());
        }
      }
    };
    fetchData();
  }, [dispatch, address, passPhrase]);
};

export default useLoadUserInfo;
