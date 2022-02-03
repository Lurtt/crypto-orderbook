import { FC } from 'react';

import { Oderbook } from 'components/Oderbook';
import { Layout } from 'components/Layout';
import { Toast } from 'components/Toast';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

const App: FC = () => {
  const { state, dispatch } = useIndicators();

  const handleOnClick = () => dispatch({ type: 'CONTINUE' });

  return (
    <Layout>
      {state.isPaused && <Toast onClick={handleOnClick} />}
      <Oderbook />
    </Layout>
  );
};

export default App;
