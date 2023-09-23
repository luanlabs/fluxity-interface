import React, { useState } from 'react';
1;
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';

import searchLogo from 'public/images/search.svg';

const walletAddressContainer = () => {
  const [inputValue, setInputValue] = useState('Wallet address');

  return (
    <div>
      <CModal
        modalTitle="Receiver wallet address"
        buttonText={inputValue}
        buttonType="input"
        label="Receiver wallet address"
        details="Receiver wallet address"
      >
        <CInput
          placeholder="Search name of token"
          icon={searchLogo}
          className=""
          onChange={(e) => setInputValue(e.target.value)}
        />
      </CModal>
    </div>
  );
};

export default walletAddressContainer;
