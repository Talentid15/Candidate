import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../constants/store";

const API_BASE_URL = "http://localhost:4000/api/candidate";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, fetchCandidateDetails } = useAuthStore();

  useEffect(() => {
    fetchCandidateDetails();
  }, [fetchCandidateDetails]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const submitHandler = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${API_BASE_URL}/candidate-login`,
        data,
        { withCredentials: true }
      );
      await fetchCandidateDetails();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/forgot-password-email`, {
        email: forgotEmail,
      });
      setShowForgotPopup(false);
      setShowOtpPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/verify-otp`, {
        email: forgotEmail,
        otp,
      });
      setShowOtpPopup(false);
      setShowResetPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/forgot-password`,
        { 
          email: forgotEmail, 
          password: data.password, 
          confirmPasswordValue: data.confirmPassword 
        }
      );
      
      console.log("Password reset successful:", response.data);
      setShowResetPopup(false);
      alert("Password updated successfully! Please log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative max-md:flex-col max-sm:justify-center overflow-hidden bg-gradient-to-br from-white via-purple-200 to-purple-300">
      {/* Left Section */}
      <div className="md:w-1/2 flex justify-center max-md:h-[40vh] max-sm:hidden h-screen gap-3 items-center relative">
        <div className="h-1/2 relative w-5/6 max-sm:-mt-10">
          <div className="relative h-14 flex -mt-5">
          </div>
          <div className="relative mt-4">
            <p className="lg:text-6xl md:text-5xl max-md:text-3xl leading-[80px] font-semibold flex flex-wrap gap-2">
              <span className="grpHover">Sign</span>
              <span className="grpHover">In</span>
              <span className="grpHover">to</span>
              <span className="grpHover">Your</span>
              <span className="grpHover">Candidate</span>
              <span className="grpHover">Hub</span>
            </p>
          </div>
          <div className="relative mt-10 text-gray-700">
            <p>
              Accept offer letters, search for top companies, and manage your
              candidate profile all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full relative rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-1">Login</h1>
          <p className="mb-10 text-gray-600">
            Access your candidate dashboard and take control of your career.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className="p-2 pl-10 block w-full border border-gray-300 bg-transparent outline-none rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  className="p-2 pl-10 block w-full border border-gray-300 outline-none bg-transparent rounded-md focus:ring-2 focus:ring-[#652d96]"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              <span
                onClick={() => setShowForgotPopup(true)}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </p>

            {/* Signup Link */}
            <p className="mt-4 text-center text-sm text-[#652d96]">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#652d96] cursor-pointer hover:underline"
              >
                Sign Up for free
              </span>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#652d96] text-white rounded-md  transition-all"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Popup - Email Input */}
      {showForgotPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 block w-full border border-gray-300 rounded-md mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForgotPopup(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                disabled={loading || !forgotEmail}
                className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
              >
                {loading ? "Submitting..." : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="p-2 block w-full border border-gray-300 rounded-md mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOtpPopup(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Popup */}
      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="p-2 block w-full border border-gray-300 rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value, { password }) => 
                      value === password || "Passwords do not match"
                  })}
                  className="p-2 block w-full border border-gray-300 rounded-md"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetPopup(false)}
                  className="py-2 px-4 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 bg-[#652d96] text-white rounded-md hover:bg-indigo-700"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;