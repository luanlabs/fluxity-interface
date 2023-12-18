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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmitFilter = (filters: IFilterTokens) => {
    const isDefaultFilters =
      filters.tokens.length === 0 && filters.showReceivedStreams && filters.showSentStreams;
    setFilteredValues(filters);
    setSubmittedForm(!isDefaultFilters);
    closeModal();
  };

  return (
    <>
      <div className="relative inline-flex justify-between w-full mb-[17px]">
        <CStreamStatus onChange={setSelectedStatus} />
        <div className="inline-flex gap-2">
          <Styled.Circle
            isopen={openSearch}
            className={`${
              openSearch ? 'bg-[#F5F5F5]' : ''
            } hover:bg-[#f5f5f5] transition-colors duration-700`}
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
            className={`${
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
          />
        )}
      </div>
      <StreamsList
        selectedStatus={selectedStatus}
        filteredValues={filteredValues}
        searchValue={searchValue}
      />
    </>
  );
};

export default Transactions;
