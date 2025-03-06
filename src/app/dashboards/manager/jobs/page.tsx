'use client';

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
  email: string;
  createdAt: string;
}

export default function ManagerJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Job Listings</h1>

      {loading ? (
        <p className="text-center">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">No jobs available.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">{job.jobName}</h2>
              <p className="text-gray-700">
                <strong>Role:</strong> {job.role} | <strong>Company:</strong> {job.company}
              </p>
              <p className="text-gray-700">
                <strong>Package:</strong> {job.package} LPA | <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-gray-500">
                <strong>Skills:</strong> {job.skillset} | <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Posted by: <a href={`mailto:${job.email}`} className="text-blue-500">{job.email}</a> on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
