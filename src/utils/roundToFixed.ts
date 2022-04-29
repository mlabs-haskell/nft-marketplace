/**
 * Rounds the provided number to a fixed number of decimal places.
 */
export const roundToFixed = (num: number, decimals: number) => {
  const multiplier = 10 ** decimals;
  return Math.round(num * multiplier) / multiplier;
};
