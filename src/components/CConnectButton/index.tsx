import React from 'react';
import Image from 'next/image';
import freighterApi from '@stellar/freighter-api';

import copyText from 'src/utils/copyText';
import { clipText } from 'src/utils/clipText';
import { setAddress } from 'src/reducers/userInfo';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';

import wallet from 'public/images/wallet.svg';

const CConnectButton = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.userInfo.address);

  const handleConnect = () => {
    freighterApi.getPublicKey().then((address: string) => {
      dispatch(setAddress(address));
    });
  };

  return (
    <div
      className={`flex items-center px-4 rounded-xl h-[72px] ${
        address ? 'bg-white' : 'bg-lavender'
      }  border border-midnightblue cursor-pointer relative select-none`}
      onClick={handleConnect}
    >
      {address ? (
        <div className="flex justify-between items-center ">
          <div className="flex flex-col items-start">
            <span
              className="text-midnightblue text-xl"
              onClick={() => {
                copyText(address);
              }}
            >
              {clipText(address, 4)}
            </span>
            <span className="text-[12px]">Wallet is connected</span>
          </div>
          <div className="bg-ufogreen h-[10px] w-[10px] rounded-full absolute right-5" />
        </div>
      ) : (
        <div className="flex-col items-center w-full">
          <span className="flex justify-between">
            <p className="font-normal text-base"> Connect</p>
            <Image src={wallet} alt="wallet" />
          </span>
          <p className="text-xs mt-1">connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default CConnectButton;
