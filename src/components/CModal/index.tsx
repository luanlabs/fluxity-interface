import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import arrowLogo from '../../../public/images/arrow.svg';
import exitLogo from '../../../public/images/X.svg';
import CLabel from '../CLabel';
import useCustomID from 'src/hooks/useCustomId';
import searchLogo from 'public/images/search.svg';

interface ModalProps {
  children: JSX.Element | React.ReactNode;
  modalTitle: string;
  buttonText?: string;
  className?: string;
  label?: string;
  details?: string;
  buttonType?: 'select' | 'input';
  selectedToken?: JSX.Element | React.ReactNode;
  buttonClassName?: string;
}

const CModal = ({
  children,
  modalTitle,
  buttonText,
  className,
  details,
  label,
  buttonType,
  selectedToken,
  buttonClassName,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const id = useCustomID('CSelectModal');

  return (
    <>
      <div className={className}>
        <CLabel label={label} details={details} htmlFor={id} />

        {buttonType === 'select' ? (
          <button
            className={cn(
              'flex justify-between items-center w-full h-[56px] px-[16px] text-[18px] text-mutedblue rounded-[12px] bg-[#f5f5f5]',
              buttonClassName,
            )}
            onClick={openModal}
          >
            {selectedToken}
            <Image src={arrowLogo} alt="arrow" />
          </button>
        ) : (
          <button
            className="self-stretch relative px-12 rounded-[12px] placeholder-[#7D7B9B] text-[#7D7B9B] text-[16px] w-full h-14 p-4 bg-neutral-100 justify-start items-center inline-flex outline-none"
            onClick={openModal}
          >
            {buttonText}
            <div className="absolute bottom-4 left-3.5">
              <Image src={searchLogo} width={22} height={22} alt="inputIcon" />
            </div>
          </button>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[28px] text-midnightblue font-medium leading-6 flex justify-between mb-[32px]"
                  >
                    {modalTitle}
                    <Image
                      src={exitLogo}
                      alt="closeModal"
                      onClick={closeModal}
                      className="cursor-pointer"
                    />
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CModal;
