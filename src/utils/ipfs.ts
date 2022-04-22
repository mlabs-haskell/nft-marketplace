export const ipfsUrlToHash = (url: string) => {
  const [_, hash] = url.split('//');

  return hash ?? url;
};

export const ipfsUrlFromHash = (ipfsHash: string) => {
  return `ipfs://${ipfsHash}`;
};
