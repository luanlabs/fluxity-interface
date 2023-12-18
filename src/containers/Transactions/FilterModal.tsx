import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import CButton from 'src/components/CButton';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { IToken } from 'src/reducers/tokens';

import close from 'public/images/whiteClose.svg';
import searchLogo from 'public/images/search.svg';
import { IFilterTokens } from 'src/constants/types';
import defaultToken from 'public/images/defaultToken.svg';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  handleSubmitFilter: (filteredValuesObject: IFilterTokens) => void;
};

const FilterModal = ({ open, closeModal, handleSubmitFilter }: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestionValue, setSuggestionValue] = useState<IToken[]>([]);
  const [isListVisible, setIsListVisible] = useState(true);

  const dispatch = useAppDispatch();
  const tokens = useAppSelector((store) => store.tokens);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const secondModalRef = useRef<HTMLUListElement | null>(null);

  const suggestions = tokens.filter((token) =>
    token.symbol.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredValuesObject: IFilterTokens = {
      tokens: suggestionValue,
      showSentStreams: e.target.sent.checked,
      showReceivedStreams: e.target.received.checked,
    };

    dispatch(setFilterValues(filteredValuesObject));
    handleSubmitFilter(filteredValuesObject);
  };

  const handleTokenSelect = (suggestion: IToken, isChecked: boolean) => {
    if (isChecked) {
      setSuggestionValue([...suggestionValue, suggestion]);
    } else {
      const filteredTokens = suggestionValue.filter(
        (token) => token.address !== suggestion.address,
      );
      setSuggestionValue(filteredTokens);
    }
  };

  const handleRemoveSuggestion = (suggestion: IToken) => {
    const filteredTokens = suggestionValue.filter((token) => token.address !== suggestion.address);
    setSuggestionValue(filteredTokens);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
      if (secondModalRef.current && !secondModalRef.current.contains(event.target as Node)) {
        setIsListVisible(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal, open]);

  return (
    <div
      ref={modalRef}
      className={`p-[12px] bg-red-white shadow shadow-[#00000014] rounded-xl ${
        open ? `absolute top-16 right-4 w-[246px] z-50` : 'hidden'
      }`}
    >
      <div className="relative flex justify-between items-center rounded-[10px] w-full h-10 p-4 bg-[#F5F5F5] gap-2">
        <Image
          src={searchLogo}
          alt="search"
          className="select-none"
          draggable={false}
          width={16}
          height={16}
        />
        <input
          name="input"
          placeholder="Filter tokens"
          autoFocus
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          className={`h-9 w-[180px] focus:outline-none bg-[#F5F5F5]`}
        />
      </div>

      {isListVisible && (
        <ul
          ref={secondModalRef}
          className={`absolute max-h-[105px] overflow-auto top-14 right-[12px] left-[12px] p-[15px] shadow shadow-[#00000033] rounded-lg mt-1 bg-white`}
        >
          {suggestions.map((suggestion, index) => (
            <div key={index}>
              <li className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-black border-black rounded-none border-1 mr-1"
                  name={suggestion.symbol}
                  onChange={(e) => {
                    handleTokenSelect(suggestion, e.target.checked);
                  }}
                />
                <Image
                  src={suggestion.logo ? suggestion.logo : defaultToken}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <label> {suggestion.symbol}</label>
              </li>
              {suggestions.length !== index + 1 && <hr className="my-2" />}
            </div>
          ))}
        </ul>
      )}

      <div className={`${suggestionValue.length && 'mt-[19px]'} flex gap-1 flex-wrap`}>
        {suggestionValue.map((suggestion, index) => (
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
        <div className="flex flex-col py-[19px] select-none space-y-1">
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black border-black rounded-none border-1"
              name="received"
              defaultChecked
              value="received"
            />
            <label>Received Streams</label>
          </span>
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              name="sent"
              defaultChecked
              value="sent"
            />
            <label>Sent Streams</label>
          </span>
        </div>
        <CButton
          type="submit"
          content="Confirm"
          variant="simple"
          color="blue"
          className="h-9 w-full bg-royalBlue text-white transition-colors duration-700 !rounded-[10px]"
        />
      </form>
    </div>
  );
};

export default FilterModal;
