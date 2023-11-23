import { useEffect, useState } from 'react';

import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseStream, IResponseStreamResult } from 'src/models';

export const getStreamData = async (id: string) => {
  try {
    const { data } = await fetch<IResponseStreamResult>(
      ExternalPages.FLUXITY_API + '/testnet/stream/' + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return data.result;
  } catch (error) {
    return;
  }
};

const useFetchData = (id: string) => {
  const [streamData, setStreamData] = useState<IResponseStream>();

  useEffect(() => {
    const fetchStreamsFunction = () => {
      getStreamData(id).then((stream) => {
        setStreamData(stream);
      });
    };
    fetchStreamsFunction();
  });

  return streamData;
};

export default useFetchData;
