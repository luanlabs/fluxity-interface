import qs from 'qs';

import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseStreamsResult } from 'src/constants/types';

const getStreamList = async (address: string, network: string) => {
  if (!address) {
    return [];
  }
  const qsAddress = qs.stringify({ address });
  try {
    const { data } = await fetch<IResponseStreamsResult>(
      `${ExternalPages.FLUXITY_API}/${network}/lockup?${qsAddress}`,
      {
        method: 'GET',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      },
    );

    return data.result;
  } catch (e) {}
  return [];
};

export default getStreamList;
