import { FC } from 'react';

interface Props {
  className: string;
}

export const Title: FC<Props> = ({ className }) => (
  <h1 className={`${className} text-lg tracking-wider`} data-testid="title">Order Book</h1>
);
