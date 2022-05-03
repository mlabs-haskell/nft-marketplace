export const ipfsUrlToHash = (url: string) => {
  const [, hash] = url.split('//');

  return hash ?? url;
};

export const ipfsUrlFromHash = (ipfsHash: string) => {
  return `ipfs://${ipfsHash}`;
};
