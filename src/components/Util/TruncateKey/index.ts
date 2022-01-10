export const truncatePubKeyHash = (pkh: string, limit = 10) =>
  pkh.length <= limit + 5 ? pkh : `${pkh.slice(0, limit)}...${pkh.slice(-4)}`;
