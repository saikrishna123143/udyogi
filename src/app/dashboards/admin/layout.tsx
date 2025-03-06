'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Navigation Bar */}
      <header className="bg-[#1877f2] text-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <nav className="space-x-6">
            {/* Job Postings Link */}
            <Link href="/dashboards/admin/jobs">
              <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                Job Postings
              </button>
            </Link>

            {/* Add Users Link */}
            <Link href="/dashboards/admin/users">
              <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                Add Users
              </button>
            </Link>

            {/* View All Users Button */}
            <Link href="/dashboards/admin/all-users">
              <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                View All Users
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
};

export default AdminLayout;
