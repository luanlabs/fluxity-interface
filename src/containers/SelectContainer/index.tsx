import React from 'react';

import CSelect from 'src/components/CSelect';

const Select = () => {
  return (
    <div className="w-[218px] flex flex-col">
      <CSelect labelText="Token" placeholder="Select token" className="mb-10" />
      <CSelect labelText="Token" placeholder="Select token" />
    </div>
  );
};

export default Select;
