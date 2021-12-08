export const priceToADA = (value: string) => {
  const result = parseInt(value, 10) / 1000000;
  return `${result.toFixed(3)} ADA`;
};
