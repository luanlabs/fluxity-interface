const explorersLink = (currentNetwork: string) => {
  if (currentNetwork.toLowerCase() !== 'public') {
    return `https://${currentNetwork}.stellarchain.io`;
  }
  return `https://stellarchain.io`;
};

export default explorersLink;
