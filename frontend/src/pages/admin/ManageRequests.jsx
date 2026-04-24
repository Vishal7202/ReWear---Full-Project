import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await axios.get("/api/smartmatch/allrequests");

      const data =
        res.data?.requests ||
        (Array.isArray(res.data) ? res.data : []);

      setRequests(data);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/smartmatch/update/${id}`, { status });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );

      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  // 🔥 DELETE
  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await axios.delete(`/api/smartmatch/delete/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 FILTER LOGIC
  const filtered = requests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  // 📄 PAGINATION
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-4xl font-bold text-white text-center mb-8">
        Manage Requests
      </h2>

      {/* 🔘 FILTER */}
      <div className="flex justify-center gap-3 mb-6">
        {["all", "pending", "matched", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-black border"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 📋 TABLE */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-400">No requests</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full text-sm text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">User</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((req) => (
                <tr key={req._id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{req.user?.name || "N/A"}</td>

                  <td>
                    <img
                      src={
                        req.image ||
                        req.imageUrl ||
                        req.listing?.imageUrl ||
                        "/placeholder.jpg"
                      }
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>

                  <td>{req.title}</td>
                  <td>{req.clothingType}</td>
                  <td>{req.size}</td>

                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-gray-200">
                      {req.status}
                    </span>
                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={() => updateStatus(req._id, "matched")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(req._id, "rejected")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
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

      {/* 📄 PAGINATION UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageRequests;