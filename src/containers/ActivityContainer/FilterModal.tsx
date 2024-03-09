import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Optional, ReactState } from 'src/models';
import CInput from 'src/components/CInput';
import CButton from 'src/components/CButton';
import { IToken } from 'src/reducers/tokens';
import { useAppSelector } from 'src/hooks/useRedux';
import CBottomSheet from 'src/components/CBottomSheet';
import useOutsideClickHandler from 'src/hooks/useOutsideClickHandler';

import close from 'public/images/whiteClose.svg';
import blackClose from 'public/images/close.svg';
import searchLogo from 'public/images/search.svg';
import { IFilterTokens } from 'src/constants/types';
import defaultToken from 'public/images/defaultToken.svg';

type ModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  selectedTokens: IToken[];
  isInitialSentChecked: boolean;
  isInitialReceivedChecked: boolean;
  setIsModalOpen: (_: boolean) => void;
  setSelectedTokens: ReactState<IToken[]>;
  handleFilterSubmit: (filteredValuesObject: IFilterTokens, selectedTokens: IToken[]) => void;
};

const FilterModal = ({
  isModalOpen,
  setIsModalOpen,
  handleCloseModal,
  handleFilterSubmit,
  selectedTokens,
  setSelectedTokens,
  isInitialReceivedChecked,
  isInitialSentChecked,
}: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [receivedChecked, setReceivedChecked] = useState(true);
  const [sentChecked, setSentChecked] = useState(true);

  const tokens = useAppSelector((store) => store.tokens);
  const modalRef = useRef<Optional<HTMLDivElement>>(null);
  const bottomSheetRef = useRef<Optional<HTMLDivElement>>(null);
  const secondModalRef = useRef<Optional<HTMLUListElement>>(null);

  useOutsideClickHandler(isModalOpen, handleCloseModal, modalRef, bottomSheetRef);

  useEffect(() => {
    setReceivedChecked(isInitialReceivedChecked);

    setSentChecked(isInitialSentChecked);
  }, [isInitialReceivedChecked, isInitialSentChecked]);

  const filteredTokensBySearch = tokens.filter((token) =>
    token.symbol.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsListVisible(true);
  };

  const handleClickInput = (e: any) => {
    setIsListVisible(true);
  };

  const handleReceivedChange = () => {
    setReceivedChecked(!receivedChecked);
  };

  const handleSentChange = () => {
    setSentChecked(!sentChecked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredValuesObject: IFilterTokens = {
      tokens: selectedTokens,
      showSentStreams: sentChecked,
      showReceivedStreams: receivedChecked,
    };

    handleFilterSubmit(filteredValuesObject, selectedTokens);
  };

  const handleTokenSelect = (suggestion: IToken, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTokens([...selectedTokens, suggestion]);
    } else {
      const filteredTokens = selectedTokens.filter((token) => token.address !== suggestion.address);
      setSelectedTokens(filteredTokens);
    }
  };

  const handleRemoveSuggestion = (suggestion: IToken) => {
    const filteredTokens = selectedTokens.filter((token) => token.address !== suggestion.address);
    setSelectedTokens(filteredTokens);
  };

  const ModalContent = () => (
    <>
      <div className="relative mb-1">
        <CInput
          autoFocus
          placeholder="Filter tokens"
          icon={searchLogo}
          value={inputValue}
          onClick={handleClickInput}
          onChange={handleInputChange}
          enterKeyHint="search"
          iconClassName="desktop:!bottom-2.5"
          inputClassName="desktop:!h-10 desktop:w-[180px] mobile:w-full focus:outline-none !w-full bg-[#F5F5F5] rounded-[10px]"
        />
      </div>
      {isListVisible && (
        <ul
          ref={secondModalRef}
          className={`absolute max-h-[115px] overflow-auto top-14 mobile:right-4 mobile:left-4 desktop:right-3 desktop:left-3 p-[15px] shadow shadow-[#00000033] rounded-lg mt-1 bg-white`}
        >
          <Image
            src={blackClose}
            alt="close"
            onClick={() => {
              setIsListVisible(false);
            }}
            className="absolute top-2 right-3 cursor-pointer w-5 h-5"
          />
          {filteredTokensBySearch.map((suggestion, index) => (
            <div key={index}>
              <li className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 mobile:w-6 mobile:h-6 accent-black border-black rounded-none border-1 mr-1"
                  name={suggestion.symbol}
                  onChange={(e) => {
                    handleTokenSelect(suggestion, e.target.checked);
                  }}
                  checked={selectedTokens.some((token) => token.symbol === suggestion.symbol)}
                  value={suggestion.symbol}
                />
                <Image
                  src={suggestion.logo ? suggestion.logo : defaultToken}
                  alt="icon"
                  width={20}
                  height={20}
                  className="mobile:!h-6 mobile:!w-6"
                />
                <label className="mobile:text-base"> {suggestion.symbol}</label>
              </li>
              {filteredTokensBySearch.length !== index + 1 && <hr className="my-2 mobile:my-3" />}
            </div>
          ))}
        </ul>
      )}
      <div className={`${selectedTokens.length && 'mt-[19px]'} flex gap-1 flex-wrap`}>
        {selectedTokens.map((suggestion, index) => (
          <div
            key={index}
            className="flex my-1 text-xs select-none items-center w-fit h-6 gap-[6px] rounded-[39px] bg-royalBlue p-[5px] pl-[10px] text-white hover:bg-buttonHover transition-colors duration-700"
          >
            {suggestion.symbol}
            <Image
              src={close}
              alt="close"
              className="select-none cursor-pointer"
              draggable={false}
              onClick={() => handleRemoveSuggestion(suggestion)}
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-[19px] select-none gap-2">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              name="received"
              value="received"
              checked={receivedChecked}
              onChange={handleReceivedChange}
            />
            <label>Received Streams</label>
          </span>
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              name="sent"
              value="sent"
              checked={sentChecked}
              onChange={handleSentChange}
            />
            <label>Sent Streams</label>
          </span>
        </div>
        <CButton
          type="submit"
          content="Confirm"
          variant="simple"
          color="blue"
          className="desktop:h-9 mobile:mt-3 w-full bg-royalBlue text-white transition-colors duration-700 !rounded-[10px]"
        />
      </form>
    </>
  );

  return (
    <>
      <div
        ref={modalRef}
        className={`mobile:hidden p-3 bg-white shadow shadow-[#00000014] rounded-xl ${
          isModalOpen ? `absolute top-16 right-4 w-[246px] z-50` : 'hidden'
        }`}
      >
        <ModalContent />
      </div>
      <CBottomSheet
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        className="desktop:!hidden"
        contentClass="p-4 pt-0"
      >
        <div ref={bottomSheetRef}>
          <ModalContent />
        </div>
      </CBottomSheet>
    </>
  );
};

export default FilterModal;
