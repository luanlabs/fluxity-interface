import React from 'react';
import Image from 'next/image';

import blueAlert from 'public/images/blueAlert.png';

const ChangeNetworkModal = () => {
  return (
    <div className="flex justify-center items-center flex-col py-9">
      <div className="flex justify-center items-center ">
        <Image src={blueAlert} alt="alert" quality={100} />
      </div>

      <div className="font-medium text-2xl mb-3 mt-4 text-center w-11/12">Wrong Network</div>

      <div className="text-[18px] w-11/12 text-center">
        Change your wallet network to Mainnet or Testnet
      </div>
    </div>
  );
};

export default ChangeNetworkModal;
