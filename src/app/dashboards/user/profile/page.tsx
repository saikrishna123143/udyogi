'use client'

import { useSession } from 'next-auth/react'

const ProfilePage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p className="text-center text-lg">Loading...</p>
  }

  if (!session) {
    return <p className="text-center text-lg text-red-500">You must be logged in to view this page.</p>
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold text-center text-[#1877f2]">User Profile</h2>
      <div className="mt-4 space-y-4">
        <p className="text-lg">
          <strong>Email:</strong> {session.user?.email}
        </p>
        <p className="text-lg">
          <strong>Role:</strong> {session.user?.role}
        </p>
      </div>
    </div>
  )
}

export default ProfilePage
