'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton' // Import Logout Button
import { SessionProvider } from 'next-auth/react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-blue-50">
        {/* Top Navigation Bar */}
        <header className="bg-[#1877f2] text-black shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">User Dashboard</h1>
            <nav className="space-x-6 flex items-center">
              {/* Job Postings Link */}
              <Link href="/dashboards/user">
              <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300">
                User Dashboard
              </button>
            </Link>
              <Link href="/dashboards/user/jobs">
                <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                  Jobs Opened
                </button>
              </Link>

              {/* Profile Link */}
              <Link href="/dashboards/user/profile">
                <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                  Profile of the User
                </button>
              </Link>

              {/* Application Status Link */}
              <Link href="/dashboards/user/application-status">
                <button className="text-[#1877f2] py-2 px-4 rounded-md bg-white hover:bg-[#165eab] transition duration-300">
                  Application Status
                </button>
              </Link>

              {/* Logout Button */}
              <LogoutButton />
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </SessionProvider>
  )
}

export default AdminLayout
