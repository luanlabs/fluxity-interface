import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

export const sendCancel = async (id: string) => {
  await fetch(ExternalPages.FLUXITY_API + '/testnet/stream', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};
