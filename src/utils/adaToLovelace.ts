/**
 * This ADA price is converted to Lovelace
 */
export const adaToLovelace = (number: number) => {
  const lovelacePerADA = 1000000;
  return BigInt(Math.round(number * lovelacePerADA));
};
