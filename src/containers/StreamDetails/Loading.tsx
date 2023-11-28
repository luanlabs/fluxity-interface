import Image from 'next/image';
import rolling from 'public/images/rolling.svg';

const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center h-12 w-12 rounded-full bg-midnightBlue">
        <Image src={rolling} alt="rolling" />
      </div>
      <div className="flex flex-col justify-center items-center text-normalGray mt-8 font-medium">
        <h2 className="text-3xl">Loading Stream Data</h2>
        <p className="text-base text-center mt-4 w-[55%]">
          Server is fetching your stream details, please wait.
        </p>
      </div>
    </div>
  );
};

export default Loading;
