import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const AdminLogin = () => {
  const navigate = useNavigate();

  // --- UI STATES ---
  const [view, setView] = useState("login"); // 'login', 'forgot', 'reset'
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // --- FORM DATA STATES ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Forgot/Reset States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // --- 1. HANDLE LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(API_URL + "/api/admin/login", {
        username,
        password,
      });
      if (res.data.message === "Login Successful") {
        localStorage.setItem("adminUser", res.data.username);
        navigate(API_URL + "/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid Username or Password!");
    }
  };

  // --- 2. SEND OTP (Forgot Password) ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      // Backend API call to send OTP via SendGrid/SMS
      await axios.post(API_URL + "/api/admin/forgot-password", {
        email,
      });
      setSuccessMsg(`OTP sent to ${email}`);
      setView("reset"); // Form badal kar Reset wala dikhayein
    } catch (err) {
      setError("Email not found or Server Error.");
    }
  };

  // --- 3. RESET PASSWORD ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const res = await axios.post(API_URL + "/api/admin/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert(res.data.message); // "Password updated successfully"
      setView("login"); // Wapas Login page par bhejein
      setUsername("");
      setPassword("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setError("Invalid OTP or Expired.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* HEADING */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {view === "login" && "Admin Login"}
          {view === "forgot" && "Forgot Password"}
          {view === "reset" && "Reset Password"}
        </h2>

        {/* ERROR / SUCCESS MESSAGES */}
        {error && (
          <p className="text-red-500 text-center bg-red-100 p-2 rounded text-sm">
            {error}
          </p>
        )}
        {successMsg && (
          <p className="text-green-600 text-center bg-green-100 p-2 rounded text-sm">
            {successMsg}
          </p>
        )}

        {/* --- FORM 1: LOGIN --- */}
        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

            <p
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline mt-2"
              onClick={() => {
                setView("forgot");
                setError("");
              }}
            >
              Forgot Password?
            </p>
          </form>
        )}

        {/* --- FORM 2: FORGOT PASSWORD (Enter Email) --- */}
        {view === "forgot" && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Enter your registered email ID to receive OTP.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition duration-200"
            >
              Send OTP
            </button>
            <p
              className="text-center text-sm text-gray-500 cursor-pointer hover:underline mt-2"
              onClick={() => {
                setView("login");
                setError("");
              }}
            >
              Back to Login
            </p>
          </form>
        )}

        {/* --- FORM 3: RESET PASSWORD (Enter OTP & New Pass) --- */}
        {view === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Check your email for the OTP code.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
            >
              Change Password
            </button>
            <p
              className="text-center text-sm text-gray-500 cursor-pointer hover:underline mt-2"
              onClick={() => {
                setView("login");
                setError("");
              }}
            >
              Cancel
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
