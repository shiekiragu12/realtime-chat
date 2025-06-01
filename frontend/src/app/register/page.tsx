'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, user, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      await register(name, email, password);
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex flex-col justify-center bg-gray-50 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 font-extrabold text-gray-900 text-3xl text-center">
          Create a new account
        </h2>
        <p className="mt-2 text-gray-600 text-sm text-center">
          Or{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
        <div className="bg-white shadow px-4 sm:px-10 py-8 sm:rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 text-sm">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block shadow-sm px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500 w-full sm:text-sm appearance-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 text-sm">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block shadow-sm px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500 w-full sm:text-sm appearance-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block shadow-sm px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500 w-full sm:text-sm appearance-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block font-medium text-gray-700 text-sm">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block shadow-sm px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500 w-full sm:text-sm appearance-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}