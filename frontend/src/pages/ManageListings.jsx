import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';

const statusColors = {
  Active: 'bg-blue-100 text-blue-700',
  Requested: 'bg-yellow-100 text-yellow-700',
  Donated: 'bg-gray-200 text-gray-600',
};

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: '',
    size: '',
    category: '',
    status: '',
  });

  const storedUser = JSON.parse(localStorage.getItem('rewear_user'));
  const token = storedUser?.token;

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await axios.get('/api/listings', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        // If backend sends array directly, fallback handled
        const data = Array.isArray(res.data) ? res.data : res.data.listings || [];
        setListings(data);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAllListings();
    else {
      setError('Unauthorized - Please login as admin');
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete listing.');
    }
  };

  const handleEditOpen = (item) => {
    setEditItem(item);
    setUpdatedData({
      title: item.title,
      size: item.size,
      category: item.category,
      status: item.status || 'Active',
    });
  };

  const handleEditChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.patch(`/api/listings/${editItem._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedListing = res.data.listing || res.data;
      setListings((prev) =>
        prev.map((item) => (item._id === editItem._id ? updatedListing : item))
      );
      setEditItem(null);
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update listing.');
    }
  };

  const filteredListings = listings.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.user?.name || '').toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] to-[#e9edff] px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-sm mb-4 md:mb-0">
          Manage All Listings
        </h1>
        <input
          type="text"
          placeholder="Search by title, category, owner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredListings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No listings available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredListings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-indigo-800">{item.title}</h2>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-500 italic">Owner: {item.user?.name || 'N/A'}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[item.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.status || 'Active'}
                </span>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditOpen(item)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Edit Listing</h2>
            <input
              type="text"
              name="title"
              value={updatedData.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="w-full px-4 py-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="size"
              value={updatedData.size}
              onChange={handleEditChange}
              placeholder="Size"
              className="w-full px-4 py-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="category"
              value={updatedData.category}
              onChange={handleEditChange}
              placeholder="Category"
              className="w-full px-4 py-2 mb-3 border rounded"
            />
            <select
              name="status"
              value={updatedData.status}
              onChange={handleEditChange}
              className="w-full px-4 py-2 mb-3 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Requested">Requested</option>
              <option value="Donated">Donated</option>
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
