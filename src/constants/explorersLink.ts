import { networks } from "@bluxcc/react";

const explorersLink = (networkPassphrase: string) => {
  if (networkPassphrase === networks.testnet) {
    return `https://testnet.stellarchain.io`;
  }

  return `https://stellarchain.io`;
};

export default explorersLink;
