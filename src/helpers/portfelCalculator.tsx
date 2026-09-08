import type { Coin } from "../redux/coinsSlice";
import type { CoinsInPortfel } from "../redux/portfelSlice";

export type PortfelSummary = {
  totalNew: number;
  diff: number;
  percentDiff: number;
};

export const portfelCalculator = (
  portfel: CoinsInPortfel[],
  liveCoins: Coin[],
): PortfelSummary => {
  let totalOld = 0;
  let totalNew = 0;

  portfel.forEach((item) => {
    const liveCoin = liveCoins.find((c) => c.id === item.id);
    const currentPrice = liveCoin ? liveCoin.current_price : item.current_price;

    totalOld += item.current_price * item.amount;
    totalNew += currentPrice * item.amount;
  });

  const diff = totalNew - totalOld;
  const percentDiff = totalOld > 0 ? (diff / totalOld) * 100 : 0;

  return {
    totalNew,
    diff,
    percentDiff,
  };
};
