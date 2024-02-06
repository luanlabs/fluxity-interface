'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FAQContent from 'src/constants/faqContent';
import { Disclosure, Transition } from '@headlessui/react';

import close from 'public/images/close.svg';
import CareRight from 'src/assets/CareRight';
import blueDivider from 'public/images/blueDivider.svg';

const FaqContainer = () => {
  const [isActive, setIsActive] = useState(0);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex overflow-scroll desktop:gap-5 flex-col w-full">
      <div className="desktop:ml-[20%] mobile:bg-white mobile:pb-5 mobile:px-6 mobile:pt-6">
        <p className="font-normal desktop:text-[56px] mobile:text-2xl desktop:mb-4">FAQ</p>
        <Image src={blueDivider} alt="Divider" className="py-2 select-none desktop:hidden" />

        <div
          className="desktop:hidden absolute top-6 right-6 cursor-pointer w-10 h-10 
        flex justify-center items-center rounded-full border border-[##0000001A]"
        >
          <Image src={close} alt="close" onClick={handleClose} />
        </div>

        <p className="desktop:w-2/3 mobile:text-lg">
          Keep all your present, future, and past streams under your touch. Enjoy secure, efficient,
          and user-friendly experience of token streaming.
        </p>
      </div>

      <div className="flex desktop:flex-row mobile:flex-col w-full">
        <div className="flex justify-start items-center basis-1/5 mobile:w-[100vw] mobile:bg-white mobile:px-6">
          <ul className="desktop:w-5/6 mobile:gap-4 mobile:inline-flex mobile:overflow-auto mobile:tracking-tight">
            {FAQContent.map((item, index) => (
              <li
                key={item.title}
                className={`flex items-center justify-between whitespace-nowrap font-medium py-3 px-[10px] mobile:px-0  select-none mobile:!text-2xl mobile:text-[#9D9D9D] ${
                  isActive === index && 'bg-white mobile:!bg-transparent mobile:text-midnightBlue'
                } rounded-xl my-1 cursor-pointer tall:text-base text-sm desktop:min-w-[185px]`}
                onClick={() => {
                  setIsActive(index);
                }}
              >
                {item.title}
                <span className={`${isActive === index ? 'block' : 'hidden'} mobile:hidden`}>
                  <CareRight />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-4/5">
          <div
            className="w-full desktop:bg-white mobile:p-0 pt-[34px] pb-4 px-[52px] mobile:mt-4 mt-[42px]
            rounded-[14px] border border-[#0501421A] mobile:border-none mobile:px-6"
          >
            <p className="font-medium tall:text-[32px] text-[28px] mb-[37px] mobile:hidden">
              {FAQContent[isActive].title}
            </p>
            <div className="tall:h-[55vh] desktop:h-[40vh] overflow-scroll">
              {FAQContent[isActive].questions.map(({ question, answer }) => (
                <Disclosure key={question}>
                  {({ open }) => (
                    <div className="rounded-[14px] border border-[#0501421A] mb-2">
                      <Disclosure.Button className="focus:outline-none mobile:p-4 p-[32px] focus-visible:ring focus-visible:ring-purple-500/75 w-full flex justify-between items-center tall:text-2xl mobile:text-lg text-xl font-medium text-start">
                        {question}
                        <div className={`${open ? '!rotate-90' : '!rotate-[360deg]'} transform`}>
                          <CareRight />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        enter="transition duration-300 ease-out"
                        enterFrom="opacity-0 transform translate-y-[-10px]"
                        enterTo="opacity-100 transform translate-y-0"
                        leave="transition duration-300 ease-in"
                        leaveFrom="opacity-100 transform translate-y-0"
                        leaveTo="opacity-0 transform translate-y-[-10px]"
                      >
                        <Disclosure.Panel
                          static
                          className="mobile:text-base mobile:p-4 px-[32px] mt-[-15px] pb-5 text-lg"
                        >
                          {answer}
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;
