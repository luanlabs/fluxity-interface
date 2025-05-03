import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseTokenResult } from 'src/constants/types';

export const getTokenList = async (network: string) => {
  const { data, response } = await fetch<IResponseTokenResult>(
    `${ExternalPages.FLUXITY_API}/${network}/token`,
  );
  return { data, response };
};
