import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';
import Image from 'next/image';

import FilterModal from './FilterModal';
import * as Styled from './styles';

import Funnel from 'src/assets/Funnel';
import searchLogo from 'public/images/search.svg';
import { useState } from 'react';
import { IToken } from 'src/reducers/tokens';
import { IFilterTokens } from 'src/constants/types';

type FiltersProps = {
  filteredValues: IFilterTokens;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<StreamStatus>>;
  setFilteredValues: React.Dispatch<React.SetStateAction<IFilterTokens>>;
};

const Filters = ({
  filteredValues,
  setFilteredValues,
  setSelectedStatus,
  setSearchValue,
}: FiltersProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [selectedTokenValue, setSelectedTokenValue] = useState<IToken[]>([]);
  const [initialReceivedChecked, setInitialReceivedChecked] = useState(true);
  const [initialSentChecked, setInitialSentChecked] = useState(true);

  const [openSearch, setOpenSearch] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmitFilter = (filters: IFilterTokens, selectedTokens: IToken[]) => {
    const isDefaultFilters =
      filters.tokens.length === 0 && filters.showReceivedStreams && filters.showSentStreams;

    setFilteredValues(filters);
    setSubmittedForm(!isDefaultFilters);
    setSelectedTokenValue(selectedTokens);

    closeModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setInitialReceivedChecked(filteredValues.showReceivedStreams);
    setInitialSentChecked(filteredValues.showSentStreams);
  };

  return (
    <div className="relative inline-flex mobile:flex mobile:!justify-center justify-between w-full desktop:mb-3">
      <CStreamStatus onChange={setSelectedStatus} />
      <div className="desktop:inline-flex mobile:flex mobile:gap-0 desktop:gap-2">
        <Styled.Circle
          isopen={openSearch}
          className={`mobile:absolute mobile:top-[72px] mobile:right-4 desktop:static mobile:!border-none 
            ${
              openSearch ? 'bg-[#F5F5F5] mobile:!w-[calc(100%-30px)]' : ''
            } hover:bg-[#f5f5f5] transition-colors duration-700`}
        >
          <input
            placeholder="Search wallet address"
            onChange={onChange}
            autoFocus
            className={`${
              openSearch ? 'block' : 'hidden'
            } h-9 desktop:w-[190px] mobile:!w-[calc(100%-40px)] focus:outline-none bg-[#F5F5F5]`}
          />
          <Image
            src={searchLogo}
            alt="searchLogo"
            className="select-none mobile:!w-[28px] mobile:!h-[28px]"
            draggable={false}
            onClick={handleSearch}
          />
        </Styled.Circle>
        <Styled.Circle
          onClick={handleOpenModal}
          className={`mobile:absolute mobile:z-50 mobile:bg-white mobile:!w-14 mobile:!h-14 mobile:bottom-20 mobile:right-4 desktop:static ${
            submittedForm && '!border-royalBlue bg-lavenderBlush'
          } hover:bg-lavenderBlush transition-all duration-700`}
        >
          <Funnel fill={submittedForm ? '#3a21d4' : '#050142'} />
        </Styled.Circle>
      </div>

      {openModal && (
        <FilterModal
          open={openModal}
          closeModal={closeModal}
          setIsOpen={setOpenModal}
          handleSubmitFilter={handleSubmitFilter}
          selectedTokenValue={selectedTokenValue}
          setSelectedTokenValue={setSelectedTokenValue}
          initialReceivedChecked={initialReceivedChecked}
          initialSentChecked={initialSentChecked}
        />
      )}
    </div>
  );
};

export default Filters;
