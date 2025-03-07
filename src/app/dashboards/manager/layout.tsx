'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface ManagerLayoutProps {
  children: ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-[#1d4ed8] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manager Dashboard</h1>
          <nav className="space-x-4 flex">
            {/* View Jobs */}
            <Link href="/dashboards/manager/jobs">
              <button className="bg-white text-[#1d4ed8] py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">
                View Jobs
              </button>
            </Link>

            {/* View Users */}
            <Link href="/dashboards/manager/users">
              <button className="bg-white text-[#1d4ed8] py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">
                View Users
              </button>
            </Link>

            {/* Open Applications */}
            <Link href="/dashboards/manager/applications">
              <button className="bg-white text-[#1d4ed8] py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">
                Open Applications
              </button>
            </Link>

            {/* Update Application Status */}
            <Link href="/dashboards/manager/update-status">
              <button className="bg-white text-[#1d4ed8] py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">
                Update Application Status
              </button>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6">{children}</main>
    </div>
  );
}
