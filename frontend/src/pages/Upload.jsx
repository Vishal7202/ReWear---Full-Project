// src/pages/Upload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";

const CLOUD_NAME = "dswai0wnu";
const UPLOAD_PRESET = "rewear_uploads";

const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    size: "",
    category: "",
    condition: "",
    imageUrl: "",
  });
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("Uploading image...");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      if (result.secure_url) {
        setForm({ ...form, imageUrl: result.secure_url });
        setPreview(result.secure_url);
        setMessage("✅ Image uploaded successfully!");
      } else {
        setMessage("❌ Upload failed. Check Cloudinary settings.");
        console.error("Cloudinary error:", result);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/upload", form); // axios.js already adds token
      setMessage("✅ Listing created successfully!");
      setForm({ title: "", size: "", category: "", condition: "", imageUrl: "" });
      setPreview("");
      setTimeout(() => navigate("/my-listings"), 1500);
    } catch (err) {
      console.error("Submit Error:", err);
      setMessage(err.response?.data?.message || "Failed to upload listing.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-purple-200">
        <h2 className="text-4xl font-bold text-purple-700 text-center mb-6">
          Upload a Clothing Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Title (e.g., Denim Jacket)"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            name="size"
            placeholder="Size (S, M, L, XL)"
            value={form.size}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Casual, Winter, Kids...)"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>

          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Uploaded"
                className="rounded-md w-40 h-40 object-cover border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Please wait..." : "Upload Now"}
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-purple-700 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
