type StellarConfig = {
  network: string;
  contract: string;
  networkUrl: string;
  networkPassphrase: string;
  sorobanRpcUrl: string;
};

export const Futurenet: StellarConfig = {
  network: 'FUTURENET',
  contract: '',
  networkUrl: 'https://horizon-futurenet.stellar.org',
  networkPassphrase: 'Test SDF Future Network ; October 2022',
  sorobanRpcUrl: 'https://rpc-futurenet.stellar.org',
};

export const Mainnet: StellarConfig = {
  network: 'PUBLIC',
  contract: process.env.NEXT_PUBLIC_MAINNET_CONTRACT || '',
  networkUrl: process.env.NEXT_PUBLIC_MAINNET_HORIZONURL || 'https://horizon.stellar.org',
  networkPassphrase: 'Public Global Stellar Network ; September 2015',
  sorobanRpcUrl: process.env.MAINNET_SOROBAN_RPCURL || '',
};

export const Testnet: StellarConfig = {
  network: 'TESTNET',
  contract: process.env.NEXT_PUBLIC_TESTNET_CONTRACT || '',
  networkUrl: process.env.NEXT_PUBLIC_TESTNET_HORIZONURL || 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  sorobanRpcUrl:
    process.env.NEXT_PUBLIC_TESTNET_SOROBAN_RPCURL || 'https://soroban-testnet.stellar.org',
};
