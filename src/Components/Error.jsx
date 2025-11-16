import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page Not Found</p>

      <Link
        to="/"
        className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition"
      >
        Go Back Trackify
      </Link>
    </div>
  );
};

export default Error;