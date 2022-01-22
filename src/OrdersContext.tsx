import React from 'react'
import { useImmerReducer } from "use-immer";

import { EVENT_SUBSCRIBE, EVENT_UNSUBSCRIBE, FEED_BOOK_UI, PI_XBTUSD } from './constants'

type State = {
  bids: Order[]
  asks: Order[]
  product_ids: [string]
}

type SendJsonMessage = (jsonMessage: any, keep?: boolean) => void

type Action =
  | { type: 'SUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'UNSUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'CREATE_SNAPSHOT'; playload: State }
  | { type: 'UPDATE_SNAPSHOT'; payload: State }
  | { type: 'SLICE_SNAPSHOT'; payload: { maxRecords: number } }
  | { type: 'UPDATE_PRODUCT_IDS'; payload: { product_ids: [string] } }

type Dispatch = (action: Action) => void

type OrdersProviderProps = { children: React.ReactNode };

const OrdersContext = React.createContext<{ dispatch: Dispatch; state: State } | undefined>(
  undefined
);

const reduceDeltaOrders = (prevDelta: Order[], currDelta: Order) => {
  const [price, size] = currDelta;

  if (size === 0) {
    return prevDelta.filter(([oldPrice]) => oldPrice !== price);
  }

  if (size > 0) {
    if (prevDelta.find(([oldPrice]) => oldPrice === price)) {
      return prevDelta.map((oldDelta) => oldDelta[0] === price ? currDelta : oldDelta)
    }

    return [...prevDelta, currDelta];
  }

  return prevDelta;

}

const ascOrders = ([firstPrice]: Order, [secondPrice]: Order) => firstPrice - secondPrice

const descOrders = ([firstPrice]: Order, [secondPrice]: Order) => secondPrice - firstPrice

const ordersReducer = (draft: State, action: Action) => {
  switch (action.type) {
    case 'SUBSCRIBE':
      action.payload.sendJsonMessage({ event: EVENT_SUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids })
      break;
    case 'UNSUBSCRIBE':
      action.payload.sendJsonMessage({ event: EVENT_UNSUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids })
      break;
    case 'CREATE_SNAPSHOT':
      draft.bids = action.playload.bids;
      draft.asks = action.playload.asks;
      break;
    case 'UPDATE_SNAPSHOT':
      draft.bids = action.payload.bids
        .reduce(reduceDeltaOrders, draft.bids)
        .sort(descOrders)
      draft.asks = action.payload.asks
        .reduce(reduceDeltaOrders, draft.asks)
        .sort(ascOrders)
      break;
    case 'SLICE_SNAPSHOT':
      draft.bids = draft.bids.slice(0, action.payload.maxRecords)
      draft.asks = draft.asks.slice(0, action.payload.maxRecords)
      break;
    case 'UPDATE_PRODUCT_IDS':
      draft.product_ids = action.payload.product_ids
      break;
    default:
      throw new Error('Unhandled action type');
  }
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [state, dispatch] = useImmerReducer<State, Action>(ordersReducer, {
    bids: [],
    asks: [],
    product_ids: [PI_XBTUSD],
  })
  const value = { state, dispatch }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export const useOrders = () => {
  const context = React.useContext(OrdersContext)

  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }

  return context;
}
