export const priceToLovelace = (value?: number): string => {
  if (!value) return '';
  const result = value * 1000000;
  return `${result} Lovelace`;
};
