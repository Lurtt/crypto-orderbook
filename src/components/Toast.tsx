import { FC } from 'react';

interface Props {
  onClick: () => void
}

export const Toast: FC<Props> = ({ onClick }) => (
  <div
    className="sticky top-4 w-full max-w-xs p-4 mx-auto text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
    role="alert"
    data-testid="toast"
  >
    <div className="flex">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
      </div>

      <div className="ml-3 text-sm font-normal">
        <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">You were disconnected</h3>
        <p className="mb-2 text-sm font-normal">Session cancelled due to inactivity.</p>
        <button
          onClick={onClick}
          className="inline-flex justify-center px-8 py-2 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          data-testid="toast-button-reconnect">
          Reconnect
        </button>
      </div>
    </div>
  </div>
);

