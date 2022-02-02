import { FC } from 'react';

export const Layout: FC = ({ children }) => (
  <main className="py-6 px-8 bg-gray-900 text-gray-100">
    {children}
  </main>
);

