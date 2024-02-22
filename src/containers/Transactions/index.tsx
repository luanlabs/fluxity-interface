'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { IFilterTokens } from 'src/constants/types';
import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/assets/Funnel';
import searchLogo from 'public/images/search.svg';

import * as Styled from './styles';
import StreamsList from './StreamsList';
import FilterModal from './FilterModal';
import { IToken } from 'src/reducers/tokens';

const Transactions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [filteredValues, setFilteredValues] = useState<IFilterTokens>({
    tokens: [],
    showReceivedStreams: true,
    showSentStreams: true,
  });
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus>(StreamStatus.ONGOING);
  const [selectedTokenValue, setSelectedTokenValue] = useState<IToken[]>([]);
  const [initialReceivedChecked, setInitialReceivedChecked] = useState(true);
  const [initialSentChecked, setInitialSentChecked] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setInitialReceivedChecked(filteredValues.showReceivedStreams);
    setInitialSentChecked(filteredValues.showSentStreams);
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

  return (
    <div className="h-full">
      <div className="desktop:relative inline-flex mobile:flex mobile:justify-center justify-between w-full mb-[17px]">
        <CStreamStatus onChange={setSelectedStatus} />
        <div className="desktop:inline-flex mobile:flex mobile:gap-0 desktop:gap-2">
          <Styled.Circle
            isopen={openSearch}
            className={`mobile:absolute mobile:!w-14 mobile:!h-14 mobile:top-[72px] mobile:right-4 desktop:static mobile:!border-none 
            ${openSearch ? 'bg-[#F5F5F5]' : ''} hover:bg-[#f5f5f5] transition-colors duration-700`}
          >
            <input
              placeholder="Search wallet address"
              onChange={onChange}
              autoFocus
              className={`${
                openSearch ? 'block' : 'hidden'
              } h-9 w-[190px] focus:outline-none bg-[#F5F5F5]`}
            />
            <Image
              src={searchLogo}
              alt="searchLogo"
              className="select-none"
              draggable={false}
              onClick={handleSearch}
            />
          </Styled.Circle>
          <Styled.Circle
            className={`mobile:absolute mobile:!w-14 mobile:!h-14 mobile:bottom-20 mobile:right-4 desktop:static ${
              submittedForm && '!border-royalBlue bg-lavenderBlush'
            } hover:bg-lavenderBlush transition-all duration-700`}
          >
            <div onClick={handleOpenModal}>
              <Funnel fill={submittedForm ? '#3a21d4' : '#050142'} />
            </div>
          </Styled.Circle>
        </div>
        {openModal && (
          <FilterModal
            open={openModal}
            closeModal={closeModal}
            handleSubmitFilter={handleSubmitFilter}
            selectedTokenValue={selectedTokenValue}
            setSelectedTokenValue={setSelectedTokenValue}
            initialReceivedChecked={initialReceivedChecked}
            initialSentChecked={initialSentChecked}
          />
        )}
      </div>
      <StreamsList
        selectedStatus={selectedStatus}
        filteredValues={filteredValues}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Transactions;
