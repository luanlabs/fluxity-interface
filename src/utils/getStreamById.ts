import { useEffect, useState } from 'react';

import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';
import { IResponseStream, IResponseStreamResult } from 'src/models';

export type streamDataType = {
  loading: boolean;
  data: null | IResponseStream;
  error: null | any;
};

export const getStreamById = async (id: string) => {
  const { data } = await fetch<IResponseStreamResult>(
    ExternalPages.FLUXITY_API + '/testnet/stream/' + id,
  );

  return data.result;
};

const useGetStreamById = (id: string) => {
  const [streamData, setStreamData] = useState<streamDataType>({
    loading: true,
    data: null,
    error: false,
  });

  useEffect(() => {
    getStreamById(id)
      .then((stream) => {
        setStreamData({
          loading: false,
          data: stream,
          error: null,
        });
      })
      .catch((error) =>
        setStreamData({
          loading: false,
          data: null,
          error: true,
        }),
      );
  }, [id]);

  return streamData;
};

export default useGetStreamById;
