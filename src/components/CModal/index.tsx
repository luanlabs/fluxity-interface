import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  children: JSX.Element | React.ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  width?: string;
}

const CModal = ({ children, title, isOpen, setIsOpen, width }: ModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="transform overflow-hidden rounded-[20px] bg-white p-6 text-left align-middle shadow-xl transition-all"
                  style={{
                    width: width ? width : '576px',
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-[28px] font-med text-midnightBlue leading-6 flex justify-between mb-[14px]"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 ">{children}</div>
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
