// plugins/mx-core-rbm/src/app/dashboard/page.tsx

import React from 'react';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-lg text-gray-600">This page is under construction.</p>

      <div className="mt-8">
        <svg
          className="h-24 w-24 animate-bounce text-yellow-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
      </div>
    </div>
  );
};

export default DashboardPage;
