import { FC } from 'react';

import { Oderbook } from 'components/Oderbook';
import { Layout } from 'components/Layout';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

const App: FC = () => {
  const { state, dispatch } = useIndicators();

  const handleOnClick = () => dispatch({ type: 'CONTINUE' });

  return (
    <Layout>
      {state.isPaused && <button onClick={handleOnClick}>CONTINUE</button>}
      <Oderbook />
    </Layout>
  );
};

export default App;
