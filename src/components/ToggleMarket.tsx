import { FC } from 'react';

interface Props {
  onClick: () => void
}

export const ToggleMarket: FC<Props> = ({ onClick }) => (
  <button className='block mx-auto px-5 py-2 rounded-md bg-purple-600' onClick={onClick} data-testid="toggle-market">Toggle Feed</button>
);

