'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import CStreamStatus, { StreamStatus } from 'src/components/CStreamStatus';

import Funnel from 'src/assets/Funnel';
import searchLogo from 'public/images/search.svg';

import * as Styled from './styles';
import StreamsList from './StreamsList';
import FilterModal from './FilterModal';

const Transactions = () => {
  const [selectedStatus, setSelectedStatus] = useState<StreamStatus>(StreamStatus.ONGOING);
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  const handleSubmitFilter = () => {};

  return (
    <>
      <div className="relative inline-flex justify-between w-full mb-[17px]">
        <CStreamStatus onChange={setSelectedStatus} />
        <div className="inline-flex gap-2">
          <Styled.Circle isopen={openSearch} className={`${openSearch ? 'bg-[#F5F5F5]' : ''}`}>
            <input
              placeholder="Search wallet address"
              onChange={onChange}
              autoFocus
              className={`${
                openSearch ? 'block' : 'hidden'
              } h-9 w-[200px] focus:outline-none bg-[#F5F5F5]`}
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
              openModal && '!border-royalBlue bg-lavenderBlush'
            } hover:bg-lavenderBlush transition-all duration-700`}
          >
            <div onClick={handleOpenModal}>
              <Funnel fill={openModal ? '#3a21d4' : '#050142'} />
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
      <StreamsList selectedStatus={selectedStatus} searchValue={searchValue} />
    </>
  );
};

export default Transactions;
