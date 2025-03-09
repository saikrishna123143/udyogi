'use client'

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to the Manager Dashboard</h2>
        <p className="text-lg text-gray-600 mb-6">Manage applications, view users, and oversee job postings.</p>
        
        <div className="space-y-6">
          <p className="text-xl font-semibold text-gray-700">Use the navigation bar above to :</p>
          <ul className="text-lg space-y-2 text-gray-600">
            <li className="bg-gray-100 p-3 rounded-lg shadow-sm">📌 Update Application Status</li>
            <li className="bg-gray-100 p-3 rounded-lg shadow-sm">👥 View Users</li>
            <li className="bg-gray-100 p-3 rounded-lg shadow-sm">💼 View Jobs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
