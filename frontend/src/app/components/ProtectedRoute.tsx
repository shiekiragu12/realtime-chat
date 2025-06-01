'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md p-8 rounded-lg">
          <div className="flex justify-center">
            <div className="border-indigo-500 border-t-2 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}