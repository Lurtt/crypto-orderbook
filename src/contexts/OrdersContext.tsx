import React from 'react'
import { useImmerReducer } from "use-immer";

import { EVENT_SUBSCRIBE, EVENT_UNSUBSCRIBE, FEED_BOOK_UI, PI_XBTUSD } from 'app-constants';
import {
  reduceDeltaOrders,
  ascOrders,
  descOrders,
  calculateTotals,
  getTotalMaxValue
} from './OrdersContextService';

type SendJsonMessage = (jsonMessage: any, keep?: boolean) => void

type Action =
  | { type: 'SUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'UNSUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'CREATE_SNAPSHOT'; playload: IndicatorState }
  | { type: 'UPDATE_SNAPSHOT'; payload: IndicatorState }
  | { type: 'SLICE_SNAPSHOT'; payload: { maxRecords: number } }
  | { type: 'UPDATE_PRODUCT_IDS'; payload: { product_ids: [string] } }

type Dispatch = (action: Action) => void

type OrdersProviderProps = { children: React.ReactNode };

const OrdersContext = React.createContext<{ dispatch: Dispatch; state: IndicatorState } | undefined>(
  undefined
);

const ordersReducer = (draft: IndicatorState, action: Action) => {
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
        .sort(descOrders)
        .reduce(reduceDeltaOrders, draft.bids)

      draft.asks = action.payload.asks
        .sort(ascOrders)
        .reduce(reduceDeltaOrders, draft.asks)

      draft.bids = calculateTotals(draft.bids)
      draft.asks = calculateTotals(draft.asks)

      draft.maxTotal = getTotalMaxValue(draft)
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
  const [state, dispatch] = useImmerReducer<IndicatorState, Action>(ordersReducer, {
    bids: [],
    asks: [],
    product_ids: [PI_XBTUSD],
    maxTotal: 0
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
