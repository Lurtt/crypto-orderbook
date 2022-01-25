export const getTotalMaxValue = ({ bids, asks }: IndicatorState) => {
  const [ , , lastBidTotal ] = bids[bids.length - 1];
  const [ , , lastAskTotal ] = asks[asks.length - 1];

  return Math.max(lastBidTotal, lastAskTotal);
};
