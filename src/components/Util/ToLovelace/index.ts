/**
 * This ADA price is converted to Lovelace
 */
export default function ToLovelace(number: number) {
  return BigInt(number * 1000000);
}
