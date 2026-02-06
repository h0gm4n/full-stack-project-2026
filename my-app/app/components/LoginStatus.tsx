'use client'

import { useState, useEffect } from 'react';
import { verifyToken, logout } from '../actions';

export default function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const result = await verifyToken();
        if (result.isValid && result.user) {
          setIsLoggedIn(true);
          setUsername(result.user.username);
        } else {
          setIsLoggedIn(false);
          setUsername(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUsername(null);
      } finally {
        setLoading(false);
      }
    }

    checkToken();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUsername(null);
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!isLoggedIn) {
    return null; // Don't display anything if not logged in
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded">
      <span className="text-sm font-medium text-green-700">
        ✓ Logged in as <strong>{username}</strong>
      </span>
      <button
        onClick={handleLogout}
        className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
