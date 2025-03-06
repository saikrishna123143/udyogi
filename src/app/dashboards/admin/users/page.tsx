'use client';

import { useState } from 'react';

export default function AdminUserManagement() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    if (!res.ok) {
      setMessage('Failed to create user');
      return;
    }

    setMessage('User created successfully!');
    setEmail('');
    setPassword('');
    setRole('user');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Admin - Create Users</h2>

        {message && <p className="text-center mt-2 text-green-500">{message}</p>}

        <form onSubmit={handleCreateUser} className="mt-4">
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
          <select
            className="w-full p-2 border rounded mb-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
