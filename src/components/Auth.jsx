import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

function Auth({ children }) {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open('login');
  };

  const handleSignup = () => {
    netlifyIdentity.open('signup');
  };

  return (
    <div>
      {!netlifyIdentity.currentUser() ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold text-center mb-6">
              Construction Career Survey
            </h1>
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-50"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default Auth; 