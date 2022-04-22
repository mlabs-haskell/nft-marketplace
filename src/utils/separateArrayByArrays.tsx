export function separateArrayByArrays<T>(array: T[], size: number) {
  const result: T[][] = [];
  for (let i = 0; i < Math.ceil(array.length / size); i += 1) {
    result[i] = array.slice(i * size, i * size + size);
  }
  return result;
}
