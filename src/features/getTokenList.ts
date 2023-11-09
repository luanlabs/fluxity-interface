import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseTokenResult } from 'src/constants/types';

export const getTokenList = async () => {
  const { data, response } = await fetch<IResponseTokenResult>(
    `${ExternalPages.FLUXITY_API}/test/token`,
  );
  return { data, response };
};
