import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseAlreadyMinted } from 'src/constants/types';

export const getAlreadyMinted = async (address: string) => {
  const { data } = await fetch<IResponseAlreadyMinted>(
    `${ExternalPages.FLUXITY_API}/token/already-minted/${address}`
  );
  return data.result.minted;
};
