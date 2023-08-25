import React, { useState } from 'react';

import CInput from 'src/components/CInput';

import search from '../../../public/images/search.svg';
import summary from '../../../public/images/summary.svg';

const InputGroup = () => {
  return (
    <div className="w-[500px] flex flex-col gap-x-14">
      <CInput
        placeholderText="Address or Name in the Address Book"
        labelText="Receiver wallet address"
        labelDetail={summary}
        className="mb-8"
        title="input"
      />
      <CInput
        icon={search}
        placeholderText="Address or Name in the Address Book"
        labelText="Receiver wallet address"
        labelDetail={summary}
        className="mb-8"
      />
      <CInput
        icon={search}
        placeholderText="Address or Name in the Address Book"
        labelText="Receiver wallet address"
        labelDetail={summary}
      />
    </div>
  );
};

export default InputGroup;
