import React from 'react';

interface ProgressProps {
  progressValue: number;
}

const StreamProgress = ({ progressValue }: ProgressProps) => {
  return (
    <div className=" bg-darkOrchid w-full h-[48px] rounded-[9px] overflow-hidden relative border border-white">
      <div
        className="w-full bg-darkOrchid h-[48px] z-10 absolute top-0 left-0 transition-all ease-linear duration-300"
        style={{ transform: `translateX(${progressValue}%)` }}
      ></div>

      <div className="w-full h-[48px] bg-gradient-to-r from-slate-50 via-green-50 to-softGreen absolute top-0 left-0 "></div>
    </div>
  );
};

export default StreamProgress;
