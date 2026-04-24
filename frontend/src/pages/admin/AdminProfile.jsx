import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  // 🔄 Load user from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("rewear_user"));
    if (stored) {
      setAdmin(stored);
      setName(stored.name || "");
    }
  }, []);

  // 💾 Save changes (frontend only for now)
  const handleSave = () => {
    const updated = { ...admin, name };
    localStorage.setItem("rewear_user", JSON.stringify(updated));
    setAdmin(updated);
    setEditing(false);
    toast.success("Profile updated");
  };

  if (!admin) {
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 text-black">

      {/* PROFILE HEADER */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
          {admin.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <h2 className="text-2xl font-bold mt-3">{admin.name}</h2>
        <p className="text-gray-500">{admin.email}</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          {admin.role?.toUpperCase()}
        </span>
      </div>

      {/* EDIT FORM */}
      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="text"
            value={admin.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
          />
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-6 justify-center">

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setName(admin.name);
              }}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default AdminProfile;