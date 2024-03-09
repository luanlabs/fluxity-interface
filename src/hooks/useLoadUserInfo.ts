import React, { useEffect } from 'react';

import { useAppDispatch } from './useRedux';
import getAccount from 'src/utils/getAccount';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { loadAccount, hasTestnetTokens } from 'src/reducers/user';

const useLoadUserInfo = (address: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const info = await getAccount(address);
        dispatch(loadAccount(info));

        const isMinted = await getAlreadyMinted(address);
        if (isMinted) {
          dispatch(hasTestnetTokens());
        }
      }
    };
    fetchData();
  }, [dispatch, address]);
};

export default useLoadUserInfo;
