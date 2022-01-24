export const reduceDeltaOrders = (prevDelta: Order[], currDelta: Order) => {
  const [price, size] = currDelta;

  const removeOrderByPrice = ([oldPrice]: Order) => oldPrice !== price;
  const findByPrice = ([oldPrice]: Order) => oldPrice === price;
  const saveOrder = (oldDelta: Order): Order => oldDelta[0] === price ? currDelta : oldDelta;

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

export const ascOrders = ([firstPrice]: Order, [secondPrice]: Order) => firstPrice - secondPrice

export const descOrders = ([firstPrice]: Order, [secondPrice]: Order) => secondPrice - firstPrice

export const calculateTotals = (orders: Order[]): Order[] => {
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
