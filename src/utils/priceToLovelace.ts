export const priceToLovelace = (value?: bigint): string => {
  if (!value) return '';
  const result = Number(value) * 1000000;
  return `${result} Lovelace`;
};
