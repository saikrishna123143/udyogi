'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', { redirect: false, email, password });

    if (res?.error) {
      setError('Invalid credentials');
      return;
    }

    const sessionRes = await fetch('/api/auth/session');
    const session = await sessionRes.json();

    if (session?.user?.role) {
      const dashboardRoutes: { [key: string]: string } = {
        admin: '/dashboards/admin',
        manager: '/dashboards/manager',
        hr: '/dashboards/hr',
        user: '/dashboards/user'
      };
      router.push(dashboardRoutes[session.user.role] || '/dashboards/user');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        {/* Website Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600">Udyogi Website</h1>

        {/* Login Heading */}
        <h2 className="text-2xl font-semibold text-center mt-4">Login</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
