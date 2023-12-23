'use client';

import React, { useState } from 'react';
import CareRight from 'src/assets/CareRight';
import FAQContent from 'src/constants/faqContent';
import { Disclosure, Transition } from '@headlessui/react';

const FaqContainer = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <div className="flex overflow-scroll">
      <div className="flex justify-start items-center basis-1/5 ">
        <ul className="w-5/6">
          {FAQContent.map((item, index) => (
            <li
              key={item.title}
              className={`flex items-center justify-between whitespace-nowrap font-medium py-3 px-[10px] select-none ${
                isActive === index && 'bg-white'
              } rounded-xl my-1 cursor-pointer tall:text-base text-sm`}
              onClick={() => {
                setIsActive(index);
              }}
            >
              {item.title}
              <span className={`${isActive === index ? 'block' : 'hidden'}`}>
                <CareRight />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="basis-4/5">
        <div className="w-2/3">
          <p className="font-normal text-[56px] mb-4">FAQ</p>
          <p>
            Keep all your present, future, and past streams under your touch. Enjoy secure,
            efficient, and user-friendly experience of token streaming.
          </p>
        </div>
        <div className="w-full bg-white pt-[34px] pb-4 px-[52px] mt-[42px] rounded-[14px] border border-[#0501421A]">
          <p className="font-medium tall:text-[32px] text-[28px] mb-[37px]">
            {FAQContent[isActive].title}
          </p>
          <div className="tall:h-[55vh] h-[40vh] overflow-scroll">
            {FAQContent[isActive].questions.map(({ question, answer }) => (
              <Disclosure key={question}>
                {({ open }) => (
                  <div className="p-[32px] rounded-[14px] border border-[#0501421A] mb-2">
                    <Disclosure.Button className="w-full flex justify-between items-center tall:text-2xl text-xl font-medium text-start">
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
                      leave="transition duration-200 ease-in"
                      leaveFrom="opacity-100 transform translate-y-0"
                      leaveTo="opacity-0 transform translate-y-[-10px]"
                    >
                      <Disclosure.Panel static className="text-[18px] mt-4">
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
  );
};

export default FaqContainer;
