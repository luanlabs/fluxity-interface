/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Loading from 'src/assets/Loading';
import toast from 'src/components/CToast';
import CModal from 'src/components/CModal';
import CInput from 'src/components/CInput';
import CLabel from 'src/components/CLabel';
import { IToken } from 'src/reducers/tokens';
import formatUnits from 'src/utils/formatUnits';
import useCustomID from 'src/hooks/useCustomId';
import CEmptyList from 'src/components/CEmptyList';
import { useAppSelector } from 'src/hooks/useRedux';
import humanizeAmount from 'src/utils/humanizeAmount';
import { ISelectToken, ITokenDetails } from 'src/models';
import fromDecimals from 'src/utils/soroban/fromDecimals';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';
import { xlmAssetType, checkIsUserActive } from 'src/containers/CreateLockup/checkIsUserActive';

import useFetchTokenDetails from './useFetchTokenDetails';
import useGetERC20TokenDetail from './useGetERC20TokenDetail';

import plusLogo from 'public/images/Plus.svg';
import arrowLogo from 'public/images/arrow.svg';
import searchLogo from 'public/images/search.svg';
import defaultTokenLogo from 'public/images/defaultToken.svg';

interface SelectTokenProps {
  onChange: (_: ISelectToken) => void;
  className?: string;
  value: ISelectToken;
  xlmAsset: xlmAssetType;
}

const SelectToken = ({ onChange, className, xlmAsset, value }: SelectTokenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<null | IToken>(null);
  const [searchValue, setSearchValue] = useState('');

  const address = useAppSelector((state) => state.user.address);
  const currentNetwork = useAppSelector((state) => state.user.network);

  const id = useCustomID('selectToken');
  const { tokens } = useFetchTokenDetails(address, currentNetwork.networkPassphrase);
  const { showLoading, tokenDetails, isContractAddressValid } = useGetERC20TokenDetail(
    address,
    searchValue,
    currentNetwork.networkPassphrase,
  );

  const isAccountActivated = checkIsUserActive(xlmAsset);

  useEffect(() => {
    const updatedToken = tokens.find((x) => x.address === selectedToken?.address);

    if (selectedToken?.balance === '0' && updatedToken && updatedToken.balance != '0') {
      setSelectedToken(updatedToken);

      handleTokenSelect(updatedToken);
    }
  }, [tokens]);

  const handleTokenSelect = (token: IToken) => {
    setIsOpen(false);
    setSearchValue('');
    setSelectedToken(token);

    onChange({
      value: token,
      label: token.symbol,
      icon: `${token.symbol.toLowerCase()}.svg`,
    });
  };

  const handleTokenDetails = (token: ITokenDetails) => {
    handleTokenSelect({
      ...token,
      name: token.symbol,
      logo: '',
      _id: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  };

  const openModal = () => {
    setIsOpen(true);
    setSearchValue('');
  };

  useEffect(() => {
    if (!value) {
      setSelectedToken(null);
      setSearchValue('');
    }
  }, [value]);

  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().startsWith(searchValue.toLowerCase()),
  );

  const handlePaste = () => {
    try {
      navigator.clipboard.readText().then((clipText) => {
        setSearchValue(clipText);
      });
    } catch (e) {
      toast('error', 'The Clipboard API is not available for this browser.');
    }
  };

  return (
    <div className={`${className}`}>
      <CLabel label="Token" htmlFor={id} tooltipTitle="Token" />

      <button
        className="flex justify-between w-full items-center h-14 px-4 text-lg text-mutedBlue rounded-xl bg-[#f5f5f5]"
        onClick={openModal}
        id={id}
      >
        {selectedToken && address && isAccountActivated ? (
          <div className="flex items-center justify-start">
            <Image
              src={selectedToken.logo ? selectedToken.logo : defaultTokenLogo}
              width={40}
              height={40}
              alt="logo"
            />

            <p className="ml-4 text-midnightBlue">{selectedToken.symbol}</p>
          </div>
        ) : (
          'Select token'
        )}
        <Image src={arrowLogo} alt="arrow" />
      </button>

      <CModal title="Select token" isOpen={isOpen} setIsOpen={setIsOpen}>
        {address && isAccountActivated && (
          <CInput
            placeholder="Search name/address of token"
            value={searchValue}
            icon={searchLogo}
            onChange={handleInputChange}
            handlePaste={handlePaste}
            paste
          />
        )}

        <div className="mt-[23px]">
          {address && isAccountActivated && !isContractAddressValid ? (
            filteredTokens.map((token) => (
              <div
                className="flex items-center px-2 w-full cursor-pointer h-[72px] border-b last:border-none"
                key={token.symbol}
                onClick={() => handleTokenSelect(token)}
              >
                <div className="flex w-full items-center">
                  <div className="w-[70px]">
                    <Image
                      src={token.logo ? token.logo : defaultTokenLogo}
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="text-left w-full">
                    <p className="text-black text-base w-full font-bold">{token.symbol}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="mr-5">{humanizeAmount(fromDecimals(token.balance))}</span>
                  <div className="h-[35px] w-[35px] rounded-[100px] bg-lavenderBlush hover:bg-[#f0efff95] flex justify-center items-center">
                    <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
                  </div>
                </div>
              </div>
            ))
          ) : isAccountActivated && address && tokenDetails ? (
            <div className="pb-4">
              {showLoading ? (
                <div className="w-full flex justify-center">
                  <Loading fill="#222" />
                </div>
              ) : (
                <div className="flex justify-center mt-3 items-center w-full">
                  <div
                    className="flex justify-between items-center cursor-pointer rounded-xl bg-[#F9F9F9] px-2 py-[10px] w-full"
                    onClick={() => handleTokenDetails(tokenDetails)}
                  >
                    <div className="flex items-center">
                      <Image src={defaultTokenLogo} width={30} alt="defaultTokenLogo" />
                      <span className="ml-3 text-lg">{tokenDetails.symbol}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-5">
                        {humanizeAmount(
                          formatUnits(tokenDetails.balance, Number(tokenDetails.decimals)),
                        )}
                      </span>
                      <div className="h-[35px] w-[35px] rounded-[100px] bg-lavenderBlush hover:bg-[#f0efff95] flex justify-center items-center">
                        <Image src={plusLogo} width={0} height={0} alt="plusLogo" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <CEmptyList status="No token found" description="Please connect your wallet first" />
            </div>
          )}
        </div>
      </CModal>
    </div>
  );
};

export default SelectToken;
