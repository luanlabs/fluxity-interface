import { useEffect, RefObject } from 'react';

type Ref<T> = RefObject<T>;

const useOutsideClickHandler = <T extends HTMLElement>(
  isModalOpen: boolean,
  handleCloseModal: () => void,
  modalRef: Ref<T>,
  bottomSheetRef?: Ref<T> | null,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        bottomSheetRef &&
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, handleCloseModal, modalRef, bottomSheetRef]);
};

export default useOutsideClickHandler;
