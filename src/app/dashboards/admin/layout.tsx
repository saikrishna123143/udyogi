'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface AdminLayoutProps {
  children: ReactNode
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
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6">
        {children} {/* Render children here */}
      </main>
    </div>
  )
}

export default AdminLayout
