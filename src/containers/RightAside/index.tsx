import React from 'react';
import Image from 'next/image';

import CButton from 'src/components/CButton';
import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';

import fluxityLogo from '../../../public/images/fluxity.svg';
import summaryLogo from '../../../public/images/summary.svg';
import stellarLogo from '../../../public/images/Stellar.svg';

interface SummaryItem {
  name: string;
  value: string;
  logo?: string;
}

const summary: SummaryItem[] = [
  { name: 'Token', value: 'XLM', logo: stellarLogo },
  { name: 'Stream model', value: 'Linear' },
  { name: 'Flow rate', value: '23 / Month' },
  { name: 'To', value: 'GFEE ... MGEK' },
];

const RightAside = () => {
  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4">
      <h1 className="text-[18px] text-midnightblue">Summary</h1>
      <Image src={summaryLogo} alt="summary" width={0} height={0} />
    </div>
  );

  return (
    <div>
      <CPageCard title={summaryTitle} className="px-3 py-4">
        <ul className="grid gap-2 text-midnightblue">
          {summary.map((list, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-alabaster h-[40px] px-[16px] text-[14px] rounded-[10px]"
            >
              <span>{list.name}</span>

              <div className="flex">
                {list.logo && (
                  <Image
                    src={list.logo}
                    alt="logo"
                    width={0}
                    height={0}
                    className="mr-[8px]"
                  />
                )}

                <span>{list.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </CPageCard>

      <CCard
        bgColor="#F5EBFF"
        borderColor="#BE7CFF"
        className="flex justify-between items-center text-richlavender h-[56px] px-[10px] text-[18px] my-[16px]"
      >
        <p>Total Amount</p>
        <p>100 XLM</p>
      </CCard>

      <CButton kind="form" content="Create Stream" logo={fluxityLogo} />
    </div>
  );
};

export default RightAside;
