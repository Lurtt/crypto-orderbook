import { FC, useCallback } from 'react';

import { useOrderbook } from './useOrderbook'

interface Props {
  data: Order
}

const Row: FC<Props> = ({ data }) => {
  const [price, size] = data

  return <div>{price}, {size}</div>
}

export const Oderbook: FC = () => {
  const state = useOrderbook({ maxRecords: 25 })

  const renderRow = useCallback((order) => <Row key={order[0]} data={order} />, [])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>BIDS/BUY</h1>
          {state.bids.map(renderRow)}
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>ASKS/SELL</h1>
          {state.asks.map(renderRow)}
        </div>
      </div>
    </>
  )
}
