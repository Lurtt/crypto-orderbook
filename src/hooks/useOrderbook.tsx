import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useDocumentVisibility } from 'ahooks';

import {
  WEBSOCKET_URL,
  DOCUMENT_VISIBILITY_HIDDEN,
  FEED_BOOK_UI_SNAPSHOT,
  FEED_BOOK_UI,
} from 'app-constants';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

interface UseOrderbook {
  maxRecords: number
}

export const useOrderbook = ({ maxRecords }: UseOrderbook) => {
  const documentVisibility = useDocumentVisibility();
  const {
    lastJsonMessage,
    sendJsonMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL, {
    shouldReconnect: () => true,
  });
  const { state, dispatch } = useIndicators();

  useEffect(() => {
    if (DOCUMENT_VISIBILITY_HIDDEN === documentVisibility) {
      dispatch({ type: 'UNSUBSCRIBE', payload: { sendJsonMessage } });
      dispatch({ type: 'PAUSE' });
    }
  }, [ dispatch, sendJsonMessage, documentVisibility ]);

  useEffect(() => {
    if( 1 === readyState) {
      !state.isPaused && dispatch({ type: 'SUBSCRIBE', payload: { sendJsonMessage } });
    }
    
  }, [ dispatch, sendJsonMessage, readyState, state.isPaused ]);

  useEffect(() => {
    if (FEED_BOOK_UI_SNAPSHOT === lastJsonMessage?.feed) {
      dispatch({ type: 'CREATE_SNAPSHOT', playload: lastJsonMessage });
    }
  }, [ dispatch, lastJsonMessage ]);

  useEffect(() => {
    if (FEED_BOOK_UI === lastJsonMessage?.feed) {
      if (lastJsonMessage.bids?.length || lastJsonMessage.asks?.length) {
        dispatch({ type: 'UPDATE_SNAPSHOT', payload: lastJsonMessage });
      }
    }
  }, [ dispatch, lastJsonMessage ]);

  useEffect(() => {
    if (FEED_BOOK_UI === lastJsonMessage?.feed) {
      dispatch({ type: 'SLICE_SNAPSHOT', payload: { maxRecords } });
    }
  }, [ dispatch, lastJsonMessage, maxRecords ]);

  return { sendJsonMessage, ...state };
};
