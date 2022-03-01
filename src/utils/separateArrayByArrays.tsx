export const separateArrayByArrays = (array: any[], size: number) => {
  const result = [];
  for (let i = 0; i < Math.ceil(array.length / size); i += 1) {
    result[i] = array.slice(i * size, i * size + size);
  }
  return result;
};
