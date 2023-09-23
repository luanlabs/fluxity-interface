import React, { useState } from 'react';
import Image from 'next/image';

import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';

import searchLogo from 'public/images/search.svg';
import plusLogo from 'public/images/Plus.svg';

const options = [
  { value: 'usdc', label: 'USDC', icon: 'usdc.svg' },
  { value: 'usdt', label: 'USDT', icon: 'usdt.svg' },
  { value: 'dai', label: 'DAI', icon: 'dai.svg' },
  { value: 'usdc', label: 'USDC', icon: 'usdc.svg' },
  { value: 'usdt', label: 'USDT', icon: 'usdt.svg' },
];

interface selectTokenProps {
  className: string;
}

const SelectTokenContainer = ({ className }: selectTokenProps) => {
  const [selectedToken, setSelectedToken] = useState(null);

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
  };

  const selectTokenButton = (
    <div>
      {selectedToken ? (
        <div className="flex items-center justify-start">
          <Image
            src={require(`../../../public/images/assets/${selectedToken.icon}`).default}
            width={35}
            height={35}
            alt={selectedToken.label}
          />
          <p className="ml-4">{selectedToken.label}</p>
        </div>
      ) : (
        'Select token'
      )}
    </div>
  );

  return (
    <div>
      <CModal
        modalTitle="Select token"
        buttonType="select"
        selectedToken={selectTokenButton}
        label="Select token"
        details="Select token"
        buttonClassName={className}
      >
        <CInput placeholder="Search name of token" icon={searchLogo} />
        <div className="mt-[23px]">
          {options.map((i) => (
            <div
              className="flex items-center w-full cursor-pointer h-[72px] border-b last:border-none"
              key={i.value}
              onClick={() => handleTokenSelect(i)}
            >
              <div className="basis-1/6">
                <Image
                  src={require(`../../../public/images/assets/${i.icon}`).default}
                  width={45}
                  height={45}
                  alt={i.label}
                />
              </div>

              <div className="text-left w-full">
                <p className="text-[#000] text-[16px] ml-[26px] font-bold	">{i.label}</p>
              </div>

              <div className="h-[30px] w-[40px] rounded-[100px]  bg-lavenderblush hover:bg-[#f0efff95] flex justify-center items-center">
                <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
              </div>
            </div>
          ))}
        </div>
      </CModal>
    </div>
  );
};

export default SelectTokenContainer;
