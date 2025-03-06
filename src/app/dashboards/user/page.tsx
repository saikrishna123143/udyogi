'use client'

const AdminPage = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Welcome to the User Dashboard</h2>
      <p className="text-lg text-gray-600 mb-6">view the profile and jobs.</p>
      <div className="space-y-4">
        <p className="text-xl">Use the navigation bar above to:</p>
        <ul className="text-lg">
          <li>- view profile</li>
          <li>- view jobs</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminPage
