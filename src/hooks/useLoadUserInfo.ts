import { useEffect } from 'react';

import { useAppDispatch } from './useRedux';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { loadAccount, hasTestnetTokens } from 'src/reducers/user';
import getServer from 'src/utils/soroban/getServer';

const useLoadUserInfo = (address: string, passPhrase: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const server = getServer(passPhrase);
        const info = await server.getAccount(address);
        dispatch(loadAccount(info));
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
