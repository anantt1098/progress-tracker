import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);


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

    setLoading(true);

    try {
      const payload = {
        username: formData.username.trim(),
        password: formData.password,
      };


      const { data } = await api.post(
        "/auth/login",
        payload
      );


      await login(data.user, data.token);


      toast.success(data.message);


      navigate("/dashboard", {
        replace: true,
      });


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
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
          Welcome back! Login to continue.
        </p>




        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


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
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >

                {showPassword ? (
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

            {loading ? "Logging in..." : "Login"}

          </button>



        </form>




        <p className="mt-6 text-center text-sm text-slate-600">

          Don't have an account?{" "}


          <Link
            to="/register"
            className="font-semibold text-amber-500 hover:underline"
          >
            Register
          </Link>


        </p>



      </div>


    </div>
  );
};


export default Login;