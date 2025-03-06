'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'user' })
    });

    if (!res.ok) {
      setError('Signup failed');
      return;
    }

    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        {/* Website Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600">Udyogi Website</h1>

        {/* Signup Heading */}
        <h2 className="text-2xl font-semibold text-center mt-4">Sign Up</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="mt-4">
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
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
