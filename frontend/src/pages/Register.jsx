import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const { data } = await api.post("/auth/register", payload);

      toast.success(data.message);

      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        {/* Logo */}
        <h1 className="mb-2 text-center text-4xl font-bold">

          <span className="rounded-md bg-amber-500 px-2 py-1 text-black">
            Pro
          </span>

          <span className="ml-1 rounded-md bg-blue-600 px-2 py-1 text-white">
            gressHub
          </span>

        </h1>


        <p className="mb-8 text-center text-slate-500">
          Create your account
        </p>


        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:border-amber-500 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:border-amber-500 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>


        <p className="mt-6 text-center text-sm text-slate-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="font-semibold text-amber-500 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;