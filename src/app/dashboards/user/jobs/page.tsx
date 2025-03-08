"use client";

import { useEffect, useState } from "react";

interface Job {
  id: number;
  jobName: string;
  role: string;
  company: string;
  package: number;
  experience: string;
  skillset: string;
  location: string;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [email, setEmail] = useState<string>(""); // Store user email
  const [resume, setResume] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setMessage(null);
    setResume(null);
    setProfileImage(null);
    setEmail(""); // Reset email input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !email || !resume || !profileImage) return;

    const formData = new FormData();
    formData.append("jobId", String(selectedJob.id));
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("profileImage", profileImage);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData });
      const data = await res.json();
      setMessage(data.message || "Application submitted successfully.");
    } catch (error) {
      setMessage("Failed to apply. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Job Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{job.jobName}</h2>
            <p className="text-gray-600">id : {job.id}</p>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.role}</p>
            <p className="text-gray-500">Salary: ${job.package}</p>
            <p className="text-gray-500">Experience: {job.experience}</p>
            <p className="text-gray-500">Skills: {job.skillset}</p>
            <p className="text-gray-500">Location: {job.location}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleApplyClick(job)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* Modal for applying */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Apply for {selectedJob.jobName}
            </h2>
            <p className="text-gray-600">{selectedJob.company}</p>
            <p className="text-gray-500">Role: {selectedJob.role}</p>

            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block mb-2">Resume:</label>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                required
                className="mb-4"
              />

              <label className="block mb-2">Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                required
                className="mb-4"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded mt-2"
              >
                Submit Application
              </button>
            </form>

            {message && <p className="text-center mt-4">{message}</p>}

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
