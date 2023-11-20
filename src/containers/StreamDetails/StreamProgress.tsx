interface StreamProgressProps {
  completionPercentage: string;
}

const StreamProgress = ({ completionPercentage }: StreamProgressProps) => {
  return (
    <div className="border border-white w-full rounded-xl bg-[#442cd6] ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={completionPercentage}
        height="45"
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
  );
};

export default StreamProgress;
