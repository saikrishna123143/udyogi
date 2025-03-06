// app/dashboard/page.tsx
'use client'
import { useEffect, useState } from 'react';

interface Job {
  id: number;
  jobName: string;
  role: string;
  company: string;
  package: number;
  experience: string;
  skillset: string;
  location: string;
  email: string;  // Email of the person posting the job
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{job.jobName}</h2>
              <p className="text-lg text-blue-600 mb-2">{job.role}</p>
              <p className="text-sm text-gray-500 mb-4">{job.company}</p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-700">Package: ${job.package}</p>
                <p className="text-sm text-gray-700">Experience: {job.experience}</p>
                <p className="text-sm text-gray-700">Skillset: {job.skillset}</p>
                <p className="text-sm text-gray-700">Location: {job.location}</p>
                <p className="text-sm text-gray-700">Email: {job.email}</p>  {/* Added email */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
