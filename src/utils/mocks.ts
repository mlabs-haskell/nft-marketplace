export const makeMockHash = (baseHash: string, suffixNum: number) => {
  const suffix = suffixNum.toString();
  return baseHash.substring(0, baseHash.length - suffix.length) + suffix;
};
