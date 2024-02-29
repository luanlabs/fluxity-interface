import React, { useEffect } from 'react';

import { useAppDispatch } from './useRedux';
import getAccount from 'src/utils/getAccount';
import { getAlreadyMinted } from 'src/features/getAlreadyMinted';
import { loadAccount, hasTestnetTokens } from 'src/reducers/user';

const useLoadUserInfo = (address: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) {
      getAccount(address).then((info) => {
        dispatch(loadAccount(info));
      });
      getAlreadyMinted(address).then((isMinted) => {
        if (isMinted) {
          dispatch(hasTestnetTokens());
        }
      });
    }
  }, [dispatch, address]);
};

export default useLoadUserInfo;
