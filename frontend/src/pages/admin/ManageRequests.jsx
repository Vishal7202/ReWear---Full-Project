import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('rewear_user'));
  const token = storedUser?.token;

  useEffect(() => {
    if (!token) {
      setError('Unauthorized - Please login as admin');
      setLoading(false);
      return;
    }
    fetchAllRequests();
  }, [token]);

  const fetchAllRequests = async () => {
    try {
      const res = await axios.get('/api/smartmatch/allrequests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.requests || [];
      setRequests(data);
    } catch (err) {
      console.error('❌ Error fetching all requests:', err);
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/smartmatch/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (err) {
      console.error('❌ Status update failed:', err);
      alert('Error updating status');
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`/api/smartmatch/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('Error deleting request');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-indigo-800 mb-8 drop-shadow-sm">
        Manage All Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests available.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm text-left text-gray-700 bg-white border">
            <thead className="bg-indigo-100 text-gray-800 uppercase">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{req.user?.name || 'Unknown'}</td>
                  <td className="px-4 py-2">
                    <img
                      src={req.image || '/placeholder.jpg'}
                      alt="Cloth"
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{req.title}</td>
                  <td className="px-4 py-2">{req.clothingType}</td>
                  <td className="px-4 py-2">{req.size}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.status === 'matched'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => updateStatus(req._id, 'matched')}
                      className="text-green-600 hover:text-green-800"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, 'rejected')}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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

export default ManageRequests;
