'use client'

import { useState } from 'react'

const ApplicationStatus = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckStatus = async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const response = await fetch(`/api/application-status?email=${email}`)
      const data = await response.json()

      if (response.ok) {
        setStatus(data.status)
      } else {
        setError(data.error || 'Failed to fetch status')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Check Application Status</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleCheckStatus}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>

        {status && (
          <p className="mt-4 text-center text-lg font-medium text-green-600">Application Status: {status}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-lg font-medium text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
}

export default ApplicationStatus
