import React from 'react';

interface ProgressProps {
  precent: string;
}

const StreamProgress = ({ precent }: ProgressProps) => {
  return (
    <section className="relative">
      <div className="border-2 border-white h-[48px] w-full absolute top-0 left-0 z-20 rounded-[9px] bg-transparent"></div>
      <div className="bg-darkOrchid w-full h-[48px] rounded-[9px] overflow-hidden relative">
        <div
          className="w-full bg-darkOrchid h-[48px] z-10 absolute top-0 left-0 transition-all ease-linear duration-300"
          style={{ transform: `translateX(${precent}%)` }}
        ></div>

        <div className="w-full h-[48px] bg-gradient-to-r from-slate-50 via-green-50 to-softGreen absolute top-0 left-0 "></div>
      </div>
    </section>
  );
};

export default StreamProgress;
