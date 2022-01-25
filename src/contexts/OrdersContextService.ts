export const reduceDeltaOrders = (prevDelta: Indicator[], currDelta: Indicator) => {
  const [price, size] = currDelta;

  const removeOrderByPrice = ([oldPrice]: Indicator) => oldPrice !== price;
  const findByPrice = ([oldPrice]: Indicator) => oldPrice === price;
  const saveOrder = (oldDelta: Indicator): Indicator => oldDelta[0] === price ? currDelta : oldDelta;

  if (size === 0) {
    return prevDelta.filter(removeOrderByPrice);
  }

  if (size > 0) {
    if (prevDelta.find(findByPrice)) {
      return prevDelta.map(saveOrder)
    }

    return [...prevDelta, currDelta];
  }

  return prevDelta;

}

export const ascOrders = ([firstPrice]: Indicator, [secondPrice]: Indicator) => firstPrice - secondPrice

export const descOrders = ([firstPrice]: Indicator, [secondPrice]: Indicator) => secondPrice - firstPrice

export const calculateTotals = (orders: Indicator[]): Indicator[] => {
  let total = 0;

  return orders.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};

export const getTotalMaxValue = ({ bids, asks }: IndicatorState) => {
  const [, , lastBidTotal] = bids[bids.length - 1]
  const [, , lastAskTotal] = asks[asks.length - 1]

  return Math.max(lastBidTotal, lastAskTotal)
}
