"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
  email: string;
  jobId: number;
  status: string;
  resume: string | null;
  profileImage: string | null;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch applications");
        }

        setApplications(data.applications);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading applications...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">All Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Job ID</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Resume</th>
              <th className="border border-gray-300 px-4 py-2">Profile Image</th>
              <th className="border border-gray-300 px-4 py-2">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{app.email}</td>
                <td className="border border-gray-300 px-4 py-2">{app.jobId}</td>
                <td className="border border-gray-300 px-4 py-2">{app.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.profileImage ? (
                    <a
                      href={app.profileImage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={app.profileImage}
                        alt="Profile"
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </a>
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
