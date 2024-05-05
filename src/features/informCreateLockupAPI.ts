import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

const informCreateLockupAPI = async (id: string, network: string) => {
  await fetch(ExternalPages.FLUXITY_API + `/${network}/lockup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

export default informCreateLockupAPI;
