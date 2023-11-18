'use client';

import Image from 'next/image';

import CCard from 'src/components/CCard';
import CPageCard from 'src/components/CPageCard';
import CButton from 'src/components/CButton';
import CStreamDetailsStatus from 'src/components/CStreamDetailsStatus';

import receiveLogo from '/public/images/receive.svg';
import copyLogo from '/public/images/whiteCopy.svg';
import shareLogo from '/public/images/share.svg';
import withdrawLogo from '/public/images/withdrawSolid.svg';

const StreamDetails = () => {
  const StreamDetailsTitle = (
    <div className="w-full flex justify-between items-center pb-2">
      <h1 className="text-[24px] text-midnightBlue pl-2 mt-2">Stream #100065</h1>
      <CStreamDetailsStatus type="Active" />
    </div>
  );

  const summaryTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Summary</h1>
    </div>
  );

  const statusTitle = (
    <div className="w-full flex justify-between items-center pb-4 pl-4">
      <h1 className="text-2xl text-midnightBlue">Status</h1>
      <CButton
        variant="simple"
        color="outline"
        content="Withdraw"
        logo={withdrawLogo}
        className="!px-3 !py-2 h-[40px]"
      />
    </div>
  );

  return (
    <div className="w-full flex gap-4">
      <CPageCard
        divider
        title={StreamDetailsTitle}
        className="w-full px-6 py-[15px]"
        childrenClassName="!pl-0"
      >
        <section className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6 mt-8">
            <Image src={receiveLogo} alt="receiveLogo" height={0} width={0} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[40px]">+523.348 USDC</h2>
            <p className="text-base">Total amount streamed</p>
          </div>
          <div className="w-[420px] mt-[32px]">
            <CCard
              className="flex flex-col justify-center items-center w-full h-full px-3 py-4"
              bgColor="royalBlue"
              borderColor="rgba(0, 0, 0, 0.10)"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center h-12 w-[53px] bg-[#442cd6] text-white text-base px-2 py-2.5 rounded-[9px]">
                  60%
                </div>

                <div className="border border-white w-[85%] rounded-xl bg-[#442cd6] pl-[-5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="202"
                    height="48"
                    viewBox="0 0 202 48"
                    fill="none"
                  >
                    <path
                      d="M0.824463 10C0.824463 4.47715 5.30162 0 10.8245 0H201.824V48H10.8245C5.30161 48 0.824463 43.5229 0.824463 38V10Z"
                      fill="white"
                    />
                    <path
                      d="M0.824463 10C0.824463 4.47715 5.30162 0 10.8245 0H201.824V48H10.8245C5.30161 48 0.824463 43.5229 0.824463 38V10Z"
                      fill="url(#paint0_linear_2613_5771)"
                      fill-opacity="0.3"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2613_5771"
                        x1="198.703"
                        y1="21.6"
                        x2="82.2212"
                        y2="21.6"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#00FF57" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="flex justify-between w-full mt-2 text-white overflow-hidden whitespace-nowrap items-center bg-[#442cd6] h-10 px-4 text-base rounded-[10px]">
                <span>Sender</span>

                <div className="flex">
                  <span>FEDR ... SGRE</span>
                  <Image
                    src={copyLogo}
                    alt="logo"
                    width={20}
                    height={20}
                    className="ml-2 fill-[#f45]"
                  />
                </div>
              </div>

              <p className="text-white text-base mt-[29px]">23 USDC / Month</p>
              <CButton
                variant="simple"
                color="blue"
                content="Share"
                logo={shareLogo}
                className="mt-3"
              />
            </CCard>
          </div>
        </section>
      </CPageCard>

      <div>
        <div className="w-[580px]">
          <CPageCard title={summaryTitle} className="px-3 py-4 mb-4 w-full">
            <ul className="grid gap-2 text-midnightBlue">
              <li className="flex justify-between w-full overflow-hidden whitespace-nowrap items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
                <span>Total amount</span>
                <div className="flex">
                  <span>200 USDC</span>
                </div>
              </li>
            </ul>
          </CPageCard>
        </div>

        <div className="w-[580px]">
          <CPageCard title={statusTitle} className="px-3 py-4 mb-4 w-full">
            <ul className="grid gap-2 text-midnightBlue">
              <li className="flex justify-between w-full overflow-hidden whitespace-nowrap items-center bg-alabaster h-10 px-4 text-sm rounded-[10px]">
                <span>Available</span>
                <div className="flex">
                  <span>200 USDC</span>
                </div>
              </li>
            </ul>
          </CPageCard>
        </div>
      </div>
    </div>
  );
};

export default StreamDetails;
