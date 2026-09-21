import { useEffect, useMemo, useState } from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { useBlux, useNetwork, useReadContracts, useTokenMetadata } from '@bluxcc/react';

import { ITokenDetails } from 'src/models';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const useGetERC20TokenDetail = (searchValue: string) => {
  const { user } = useBlux();
  const networkPassphrase = useNetwork();
  const address = user?.address ?? '';
  const [contractAddress, setContractAddress] = useState('');
  const networkName = passPhraseToNetworkDetail(networkPassphrase).network;
  const normalizedSearch = searchValue.toUpperCase();
  const isContractAddressValid = StrKey.isValidContract(normalizedSearch);

  useEffect(() => {
    if (!isContractAddressValid) {
      setContractAddress('');
      return;
    }

    const timeout = setTimeout(() => setContractAddress(normalizedSearch), 300);

    return () => clearTimeout(timeout);
  }, [isContractAddressValid, normalizedSearch]);

  const queryEnabled = Boolean(address && contractAddress);
  const { data: metadata, isLoading: isMetadataLoading } = useTokenMetadata(
    contractAddress,
    { network: networkPassphrase },
    { enabled: queryEnabled },
  );
  const balanceCalls = useMemo(
    () => [{ address: contractAddress, fn: 'balance', args: [address] }],
    [address, contractAddress],
  );
  const { data: balanceResult, isLoading: isBalanceLoading } = useReadContracts(
    balanceCalls,
    { network: networkPassphrase },
    { enabled: queryEnabled },
  );
  const tokenDetails = useMemo<ITokenDetails | null>(() => {
    const balance = balanceResult?.values[0];

    if (!contractAddress || !metadata || balance == null) {
      return null;
    }

    return {
      address: contractAddress,
      balance: balance.toString(),
      symbol: metadata.symbol === 'native' ? 'XLM' : metadata.symbol,
      decimals: metadata.decimals.toString(),
      name: metadata.name,
      logo: '',
      _id: '',
      claimable: false,
      network: networkName,
    };
  }, [balanceResult, contractAddress, metadata, networkName]);
  const showLoading =
    isContractAddressValid &&
    (contractAddress !== normalizedSearch || isMetadataLoading || isBalanceLoading);

  return {
    tokenDetails,
    showLoading,
    isContractAddressValid,
  };
};

export default useGetERC20TokenDetail;
