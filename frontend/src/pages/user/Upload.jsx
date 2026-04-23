import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "@/utils/axios";

const CLOUD_NAME = "dswai0wnu";
const UPLOAD_PRESET = "rewear_uploads";

const Upload = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    size: "",
    category: "",
    condition: "",
    imageUrl: "",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 🔄 INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼 IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ VALIDATION
    if (!file.type.startsWith("image/")) {
      return toast.error("Only images allowed");
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Max size 2MB");
    }

    setUploading(true);
    toast.loading("Uploading image...");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      if (!result.secure_url) throw new Error();

      setForm((prev) => ({ ...prev, imageUrl: result.secure_url }));
      setPreview(result.secure_url);

      toast.dismiss();
      toast.success("Image uploaded");
    } catch {
      toast.dismiss();
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.size || !form.category || !form.condition || !form.imageUrl) {
      return toast.error("Please fill all fields");
    }

    setSubmitting(true);

    try {
      await API.post("/api/listings", form);

      toast.success("Item uploaded 🎉");

      setTimeout(() => navigate("/my-listings"), 1200);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16 flex justify-center">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 border">

        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
          Upload a Clothing Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* INPUTS */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="text"
            name="size"
            placeholder="Size (S, M, L...)"
            value={form.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          />

          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select Condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Used</option>
          </select>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm text-gray-600">
              Upload Image
            </label>
            <input type="file" onChange={handleImageUpload} className="mt-2" />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-xl mt-3 border"
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={uploading || submitting}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            {uploading
              ? "Uploading Image..."
              : submitting
              ? "Submitting..."
              : "Upload Item"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Upload;