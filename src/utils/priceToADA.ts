export const priceToADA = (value?: bigint): string => {
  if (!value) return '';
  const result = Number(value) / 1000000;
  return `${result.toFixed(3)} ADA`;
};
