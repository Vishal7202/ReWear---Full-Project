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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f4ea] via-[#d1fae5] to-[#ecfdf5] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">

      <div className="backdrop-blur-lg bg-white/40 dark:bg-white/10 border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-md transition">

        <h2 className="text-3xl font-extrabold text-center text-green-700 dark:text-white mb-6">
          {isSignup ? "Create Your Account" : "Welcome Back"}
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4 font-medium">
            {error}
          </div>
        )}

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

          {isSignup && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <Button type="submit" loading={loading}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-green-700 dark:text-green-300 font-semibold hover:underline"
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;