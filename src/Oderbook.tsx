import { FC, useCallback, useMemo } from 'react';

import { useOrderbook } from './useOrderbook'

interface Props {
  data: Order
  maxTotal: number
}

const Row: FC<Props> = ({ data, maxTotal }) => {
  const [price, size, total] = data

  const getPercentageWidth = useMemo(() => {
    const value = ((total / (maxTotal ?? 1)) * 100)

    return `${value}%`
  }, [total, maxTotal])

  return (
    <div style={{ position: 'relative', height: 28 }}>
      <div style={{ background: 'transparent' }}>PRICE: {price}, SIZE: {size}, TOTAL: {total}</div>
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: getPercentageWidth,
        height: '100%',
        backgroundColor: '#15d41566'
      }}></div>
    </div>
  )
}

export const Oderbook: FC = () => {
  const { bids, asks, maxTotal } = useOrderbook({ maxRecords: 20 })

  const renderRow = useCallback((order: Order) => <Row key={order[0]} data={order} maxTotal={maxTotal} />, [maxTotal])

  return (
    <>
      <h1>MAX TOTAL:{maxTotal}</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>BIDS/BUY</h1>
          {bids.map(renderRow)}
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>ASKS/SELL</h1>
          {asks.map(renderRow)}
        </div>
      </div>
    </>
  )
}
