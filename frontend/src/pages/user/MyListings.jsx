import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';

const statusColors = {
  Active: 'bg-blue-100 text-blue-700',
  Requested: 'bg-yellow-100 text-yellow-700',
  Donated: 'bg-gray-200 text-gray-600',
};

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newListing, setNewListing] = useState({
    title: '',
    size: '',
    category: '',
    image: '',
  });

  // Use consistent key
  const storedUser = localStorage.getItem('rewear_user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || !token) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        const res = await axios.get(`/listings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings(res?.data?.listings || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [token]);

  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'rewear_uploads');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dswai0wnu/image/upload',
        data
      );
      setNewListing({ ...newListing, image: res.data.secure_url });
    } catch (err) {
      alert('Image upload failed');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/listings', newListing, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings([...listings, res.data.listing]);
      setNewListing({ title: '', size: '', category: '', image: '' });
      setFormVisible(false);
    } catch (err) {
      alert('Failed to create listing');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(listings.filter((item) => item._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf2ff] to-[#e3e9ff] px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-sm">My Listings</h1>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2 rounded-full shadow hover:shadow-md hover:scale-105 transition"
        >
          {formVisible ? 'Cancel' : '➕ Add New Listing'}
        </button>
      </div>

      {formVisible && (
        <form
          onSubmit={handleCreate}
          className="bg-white p-6 rounded-xl shadow-md mb-10 space-y-4 border border-indigo-100"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Cloth Title"
              value={newListing.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="size"
              placeholder="Size (e.g. M, L, Kids)"
              value={newListing.size}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Winter, Traditional)"
              value={newListing.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md bg-white focus:outline-none"
            />
          </div>

          {newListing.image && (
            <div className="flex items-center justify-start pt-2">
              <img
                src={newListing.image}
                alt="Preview"
                className="h-28 rounded-md border shadow-md"
              />
            </div>
          )}

          <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow">
            📤 Create Listing
          </button>
        </form>
      )}

      {listings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No clothes listed yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <img
                src={item.image || 'https://via.placeholder.com/300'}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-indigo-800">{item.title}</h2>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[item.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.status || 'Active'}
                </span>
                <div className="mt-4 flex justify-end">
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
    </div>
  );
};

export default MyListings;
