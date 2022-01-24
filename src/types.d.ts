type Order = [price: number, size: number, total: number]

type IndicatorType = 'buy' | 'sell';

type IndicatorState = {
  bids: Order[]
  asks: Order[]
  product_ids: [string]
  maxTotal: number
}
