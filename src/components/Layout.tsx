import { FC } from 'react';

export const Layout: FC = ({ children }) => (
  <main className="py-6 bg-gray-900 text-gray-100">
    {children}
  </main>
);

