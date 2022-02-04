import { FC } from 'react';

import { Orderbook } from 'components/Orderbook';
import { Layout } from 'components/Layout';
import { Toast } from 'components/Toast';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

const App: FC = () => {
  const { state, dispatch } = useIndicators();

  const handleOnClick = () => dispatch({ type: 'CONTINUE' });

  return (
    <Layout>
      {state.isPaused && <Toast onClick={handleOnClick} />}
      <Orderbook />
    </Layout>
  );
};

export default App;
