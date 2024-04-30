import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

const informCreateStreamAPI = async (id: string) => {
  await fetch(ExternalPages.FLUXITY_API + '/testnet/lockup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

export default informCreateStreamAPI;
