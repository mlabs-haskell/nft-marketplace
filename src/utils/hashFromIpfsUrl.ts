export const hashFromIpfsUrl = (url: string) => {
  const [_, hash] = url.split('//');

  return hash ?? url;
};
