import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    fetchRequests(storedToken);
  }, []);

  const fetchRequests = async (token) => {
    try {
      const response = await axios.get("/api/user/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data.requests || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/smartmatch/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("❌ Cancel error:", err);
      alert("Error cancelling request");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        My Clothing Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <div className="text-center text-red-500">
          {error}
          {error === "User not logged in" && (
            <div className="mt-4">
              <a
                href="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-600">
          No requests found. <br />
          <a href="/upload" className="text-purple-600 underline hover:text-purple-800">
            Upload now
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm text-left text-gray-700 bg-white border">
            <thead className="bg-purple-100 text-gray-800 uppercase">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={req.image || 'https://via.placeholder.com/60'}
                      alt="Cloth"
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{req.title}</td>
                  <td className="px-4 py-2">{req.clothingType}</td>
                  <td className="px-4 py-2">{req.size}</td>
                  <td className="px-4 py-2">{req.gender}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "matched"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {req.status === "pending" && (
                      <button
                        onClick={() => cancelRequest(req._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
