'use client'

import { useState, useEffect } from 'react';
import { verifyToken, logout } from '../actions';
import { useRouter } from 'next/navigation';

type Props = { initialUsername?: string | null; initialIsLoggedIn?: boolean };

export default function LoginStatus({ initialUsername = null, initialIsLoggedIn = false }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [username, setUsername] = useState<string | null>(initialUsername);
  const [loading, setLoading] = useState(!initialUsername && !initialIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!initialUsername) {
      (async () => {
        const res = await verifyToken();
        if (res.isValid) { setIsLoggedIn(true); setUsername(res.user.username); }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [initialUsername]);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUsername(null);
    router.push('/');
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
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