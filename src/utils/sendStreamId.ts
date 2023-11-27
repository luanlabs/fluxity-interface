import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

export const sendStreamId = async (id: string) => {
  await fetch(ExternalPages.FLUXITY_API + '/testnet/stream', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  });
};
