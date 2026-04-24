import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import toast from 'react-hot-toast';

const statusColors = {
  Active: 'bg-blue-100 text-blue-700',
  Requested: 'bg-yellow-100 text-yellow-700',
  Donated: 'bg-gray-200 text-gray-600',
};

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: '',
    size: '',
    category: '',
    status: '',
  });

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await axios.get('/api/listings');

        const data =
          res.data?.listings ||
          (Array.isArray(res.data) ? res.data : []);

        setListings(data);
      } catch (err) {
        toast.error('Failed to load listings');
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;

    try {
      await axios.delete(`/api/listings/${id}`);
      setListings((prev) => prev.filter((item) => item._id !== id));
      toast.success('Listing deleted');
    } catch {
      toast.error('Delete failed');
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

  const handleEditSave = async () => {
    try {
      const res = await axios.patch(`/api/listings/${editItem._id}`, updatedData);

      const updated = res.data?.listing || res.data;

      setListings((prev) =>
        prev.map((item) =>
          item._id === editItem._id ? updated : item
        )
      );

      toast.success('Updated successfully');
      setEditItem(null);
    } catch {
      toast.error('Update failed');
    }
  };

  const filteredListings = listings.filter((item) => {
    const s = search.toLowerCase();
    return (
      item.title?.toLowerCase().includes(s) ||
      item.category?.toLowerCase().includes(s) ||
      item.user?.name?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Listings</h1>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : filteredListings.length === 0 ? (
        <p className="text-center text-gray-400">No listings found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredListings.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow hover:shadow-xl transition">

              {/* ✅ FIXED IMAGE */}
              <img
                src={item.imageUrl || item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 text-black">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm">Size: {item.size}</p>
                <p className="text-sm">Category: {item.category}</p>
                <p className="text-xs text-gray-500">
                  Owner: {item.user?.name || 'N/A'}
                </p>

                <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${statusColors[item.status]}`}>
                  {item.status || 'Active'}
                </span>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditOpen(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 text-black">

            <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

            <input
              value={updatedData.title}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              value={updatedData.size}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, size: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              value={updatedData.category}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, category: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <select
              value={updatedData.status}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, status: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            >
              <option>Active</option>
              <option>Requested</option>
              <option>Donated</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditItem(null)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>

              <button onClick={handleEditSave} className="px-4 py-2 bg-blue-600 text-white rounded">
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