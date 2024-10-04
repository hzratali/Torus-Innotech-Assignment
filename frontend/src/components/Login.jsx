import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setAdmin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // state to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email, password }
      );
      setUser(res.data.user);
      if (res.data.user.isAdmin) {
        setAdmin(res.data.user.isAdmin);
      }

      localStorage.setItem("token", res.data.token);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Token"] = res.data.token;
      
      if (token) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle error when the user doesn't exist or other errors
      if (err.response && err.response.status === 404) {
        setError("User not exists. Please register first."); // Set error message if user not found
      } else {
        setError("An error occurred. Please try again."); // Generic error message for other issues
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <Link to='/register' className="mt-2 text-blue-700">Don't have an account?</Link>
      </div>
    </div>
  );
};

export default Login;
