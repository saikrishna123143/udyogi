"use client";

import { useState } from "react";

export default function UpdateApplicationStatus() {
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateStatus = async () => {
    if (!email || !jobId || !newStatus) {
      alert("Please enter an email, job ID, and a status.");
      return;
    }

    const res = await fetch("/api/applications/update-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, jobId, newStatus }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Status updated successfully!");
      setNewStatus("");
    } else {
      setMessage(data.error || "Failed to update status.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Update Application Status</h1>

      {/* Input for Email */}
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Input for Job ID */}
      <input
        type="text"
        placeholder="Enter Job ID"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Input for New Status */}
      <input
        type="text"
        placeholder="Enter new status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Button to Update Status */}
      <button
        onClick={handleUpdateStatus}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Update Status
      </button>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
