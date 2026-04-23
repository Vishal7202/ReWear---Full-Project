import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        {/* SUCCESS */}
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-sm">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-700">
              Message sent successfully!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-green-600 underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm p-8 space-y-5 border"
          >
            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;