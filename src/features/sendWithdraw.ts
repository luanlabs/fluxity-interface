import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

export const sendWithdraw = async (id: string) => {
  await fetch(ExternalPages.FLUXITY_API + '/testnet/stream', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};
