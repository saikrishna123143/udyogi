// app/dashboards/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Job {
  id: number
  jobName: string
  role: string
  company: string
  package: number
  experience: string
  skillset: string
  location: string
  email: string
}

interface JobFormData {
  jobName: string
  role: string
  company: string
  package: string
  experience: string
  skillset: string
  location: string
  email: string
}

const AdminPage = () => {
  const [formData, setFormData] = useState<JobFormData>({
    jobName: '',
    role: '',
    company: '',
    package: '',
    experience: '',
    skillset: '',
    location: '',
    email: '',  // Add email field
  })

  const [message, setMessage] = useState<string>('')
  const [jobs, setJobs] = useState<Job[]>([])

  // Fetch jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs')
        if (response.status === 200) {
          setJobs(response.data)
        }
      } catch (error) {
        setMessage('Error fetching jobs.')
      }
    }

    fetchJobs()
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/jobs', formData)
      if (response.status === 201) {
        setMessage('Job created successfully!')
        setFormData({
          jobName: '',
          role: '',
          company: '',
          package: '',
          experience: '',
          skillset: '',
          location: '',
          email: '',  // Clear email field
        })
        // Re-fetch jobs to update the list
        const jobsResponse = await axios.get('/api/jobs')
        setJobs(jobsResponse.data)
      }
    } catch (error) {
      setMessage('Error creating job')
    }
  }

  // Handle deleting a job
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete('/api/jobs', { data: { id } })
      if (response.status === 200) {
        setMessage('Job deleted successfully!')
        // Re-fetch jobs to update the list
        const jobsResponse = await axios.get('/api/jobs')
        setJobs(jobsResponse.data)
      }
    } catch (error) {
      setMessage('Error deleting job')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        {/* Job Creation Form */}
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Create a New Job</h2>
          {message && <div className="mb-4 text-center text-red-500">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="jobName"
                value={formData.jobName}
                onChange={handleChange}
                placeholder="Job Name"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="number"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="Package"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="skillset"
                value={formData.skillset}
                onChange={handleChange}
                placeholder="Skillset"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Create Job
            </button>
          </form>
        </div>

        {/* Display Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No jobs are posted</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600">{job.jobName}</h3>
                <p className="text-gray-500 mt-2">{job.role}</p>
                <p className="text-gray-500 mt-1">{job.company}</p>
                <p className="text-gray-500 mt-1">{job.location}</p>
                <p className="text-gray-700 mt-2">{job.experience}</p>
                <p className="text-gray-700 mt-2">{job.skillset}</p>
                <p className="text-gray-900 mt-2 font-semibold">Package: ₹{job.package}</p>
                <p className="text-gray-900 mt-2">Posted by: {job.email}</p> {/* Display the email */}
                <button
                  onClick={() => handleDelete(job.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                  Delete Job
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
