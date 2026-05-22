import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser, signupUser } from "@/services/authService";

// ✅ UI COMPONENTS
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 check query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "signup") setIsSignup(true);
  }, [location.search]);

  // 🔄 handle input
  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔐 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || (isSignup && !formData.name)) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      if (isSignup) {
        const dataToSend = {
          ...formData,
          photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`,
        };

        await signupUser(dataToSend);

        toast.success("Account created successfully 🎉");

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });

        setIsSignup(false);
      } else {
        const data = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // ✅ Save auth
        localStorage.setItem("token", data.token);
        localStorage.setItem("rewear_user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("userLogin"));

        toast.success("Login successful 🚀");

        const from = location.state?.from?.pathname;
        const role = data.user.role?.toLowerCase();

        if (from) {
          navigate(from);
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      const msg = err?.message || "Something went wrong";

      if (msg.toLowerCase().includes("password")) {
        setError("Incorrect password. Please try again.");
      } else if (msg.toLowerCase().includes("email")) {
        setError("Email not registered. Please sign up.");
      } else if (msg.toLowerCase().includes("exists")) {
        setError("Email already exists. Try logging in.");
      } else {
        setError(msg);
      }

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-[90vh] bg-[#f3f7f4] flex items-center justify-center px-4 py-10 relative overflow-hidden">

    {/* Top Logo */}
    <div className="absolute top-4 left-4 md:top-6 md:left-8 z-20">
      <h1 className="text-3xl font-extrabold text-[#4CAF50]">
        ReWear
      </h1>
    </div>

    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-40"></div>

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-3xl opacity-40"></div>

    {/* Main Card */}
    <div className="relative z-10 w-full max-w-6xl mt-16 md:mt-0 bg-white rounded-[40px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] overflow-hidden grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#4CAF50] to-[#81C784] p-14 relative overflow-hidden">

        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full"></div>

        {/* Branding */}
        <div className="relative z-10">

          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            ReWear
          </h1>

          <p className="mt-6 text-lg text-white/90 leading-relaxed">
            Buy, sell and rewear quality pre-loved clothing.
            Reduce waste. Save money. Make impact.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 mt-10">

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-white font-medium">
              ♻ Sustainable
            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-white font-medium">
              👕 Fashion
            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-white font-medium">
              🌍 Eco Friendly
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white p-6 sm:p-8 md:p-14 flex flex-col justify-center">

        {/* Mobile Logo */}
        <div className="md:hidden text-center mb-6">
          <h1 className="text-5xl font-extrabold text-[#4CAF50]">
            ReWear
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-3">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Join the sustainable fashion community
        </p>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center mb-4 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {isSignup && (
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Role Selection */}
          {isSignup && (
            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: "user" })
                }
                className={`p-3 rounded-2xl border font-semibold transition-all ${
                  formData.role === "user"
                    ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                User
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: "admin" })
                }
                className={`p-3 rounded-2xl border font-semibold transition-all ${
                  formData.role === "admin"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                Admin
              </button>

            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#43A047] hover:to-[#5DAE61] text-white py-3 rounded-2xl font-semibold text-lg shadow-md transition-all duration-300"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}{" "}

          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-[#4CAF50] font-semibold hover:underline"
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>

        </p>

      </div>
    </div>
  </div>
);
};

export default Login;