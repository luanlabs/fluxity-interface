import { useEffect, useState } from 'react';
import { StrKey } from '@stellar/stellar-sdk';

import { ITokenDetails } from 'src/models';
import getERC20Details from 'src/features/soroban/getERC20Details';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const useGetERC20TokenDetail = (
  address: string,
  searchValue: string,
  networkPassphrase: string,
) => {
  const [showLoading, setShowLoading] = useState(true);
  const networkName = passPhraseToNetworkDetail(networkPassphrase).network;
  const [tokenDetails, setTokenDetails] = useState<ITokenDetails | null>({
    address: '',
    balance: '',
    symbol: '',
    decimals: '',
    name: '',
    logo: '',
    _id: '',
    claimable: true,
    network: networkName,
  });

  const isContractAddressValid = StrKey.isValidContract(searchValue.toUpperCase());

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (isContractAddressValid) {
        setTokenDetails(await getERC20Details(searchValue, networkPassphrase, address));
        setShowLoading(false);
      }
    }, 3000);

    if (isContractAddressValid) {
      setShowLoading(true);
    }

    return () => clearTimeout(timeout);
  }, [searchValue, address, networkPassphrase]);

  return {
    tokenDetails,
    showLoading,
    isContractAddressValid,
  };
};

export default useGetERC20TokenDetail;
