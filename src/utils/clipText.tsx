const clipText = (text: string, size: number) => {
  return `${text.slice(0, size)}...${text.slice(-size)}`;
};

export default clipText;
