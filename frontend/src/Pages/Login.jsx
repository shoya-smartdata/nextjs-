import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa"; // Importing React Icon
import { Link } from "react-router-dom"; // For the Register link
import authService from "../services/authService"; // Import the updated authService

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(""); // Added error state
  const nevigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when request starts
    setError(""); // Clear any previous errors

    try {
      // Call the authService.login() method and pass navigate for redirection
      const res = await authService.login({ email, password }, nevigate);
      console.log(res);

      // Store the token in local storage
      localStorage.setItem("token", res?.token);

      // Ensure the response contains the token as expected
      if (res.token) {
        nevigate("/dashboard"); // Redirect to the dashboard
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      // Check if the error is an Axios error and display the message
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading state back to false after request
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-6">
          <FaLock className="h-12 w-12 text-blue-600 mx-auto" /> {/* React Icon */}
          <h2 className="text-3xl font-semibold text-gray-700">Sign In</h2>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Error message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Logging in..." : "Log In"} {/* Display loading text */}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
