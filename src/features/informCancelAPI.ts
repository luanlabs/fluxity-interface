import fetch from 'src/utils/request';
import { ExternalPages } from 'src/constants/externalPages';

const informCancelAPI = async (id: string, network: string) => {
  await fetch(`${ExternalPages.FLUXITY_API}/${network}/lockup`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

export default informCancelAPI;
