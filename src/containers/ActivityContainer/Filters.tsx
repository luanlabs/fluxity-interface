import { useState } from 'react';
import Image from 'next/image';

import FilterModal from './FilterModal';
import * as Styled from './styles';

import { ReactState } from 'src/models';
import { IToken } from 'src/reducers/tokens';
import { IFilterTokens } from 'src/constants/types';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/assets/Funnel';
import searchLogo from 'public/images/search.svg';

type FiltersProps = {
  filteredValues: IFilterTokens;
  setSearchValue: ReactState<string>;
  setSelectedStatus: ReactState<StreamStatus>;
  setFilteredValues: ReactState<IFilterTokens>;
};

const Filters = ({
  filteredValues,
  setFilteredValues,
  setSelectedStatus,
  setSearchValue,
}: FiltersProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [isInitialSentChecked, setIsInitialSentChecked] = useState(true);
  const [selectedTokenValue, setSelectedTokenValue] = useState<IToken[]>([]);
  const [initialReceivedChecked, setInitialReceivedChecked] = useState(true);

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
    setIsInitialSentChecked(filteredValues.showSentStreams);
    setInitialReceivedChecked(filteredValues.showReceivedStreams);
  };

  return (
    <div className="inline-flex desktop:relative mobile:flex mobile:!justify-center justify-between w-full mb-3">
      <CStreamStatus onChange={setSelectedStatus} />
      <div className="desktop:inline-flex mobile:flex mobile:gap-0 desktop:gap-2">
        <Styled.Circle
          isopen={openSearch}
          className={`mobile:absolute mobile:top-4 mobile:right-4 desktop:static mobile:!border-none 
            ${
              openSearch ? 'bg-[#F5F5F5] mobile:!w-[calc(100%-30px)]' : ''
            } hover:bg-[#f5f5f5] transition-colors duration-700`}
        >
          <input
            autoFocus
            enterKeyHint="search"
            onChange={onChange}
            placeholder="Search wallet address"
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
          className={`mobile:fixed mobile:z-50 mobile:bg-white mobile:!w-14 mobile:!h-14  mobile:bottom-20 
            mobile:right-4 desktop:static ${
              submittedForm && '!border-royalBlue bg-lavenderBlush'
            } hover:bg-lavenderBlush transition-all duration-700`}
        >
          <Funnel fill={submittedForm ? '#3a21d4' : '#050142'} />
        </Styled.Circle>
      </div>

      {openModal && (
        <FilterModal
          isModalOpen={openModal}
          handleCloseModal={closeModal}
          setIsModalOpen={setOpenModal}
          handleFilterSubmit={handleSubmitFilter}
          selectedTokens={selectedTokenValue}
          setSelectedTokens={setSelectedTokenValue}
          isInitialReceivedChecked={initialReceivedChecked}
          isInitialSentChecked={isInitialSentChecked}
        />
      )}
    </div>
  );
};

export default Filters;
