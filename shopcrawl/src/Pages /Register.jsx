import React, { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Swal from "sweetalert2";
import { UserContext } from "../Contest/userContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const RegisterForm = ({ onClose }) => {
  const { register } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [role, setRole] = useState("guest");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phone_number) {
      Swal.fire("Error", "Please fill in all fields.", "error");
      return;
    }

    const userData = {
      username,
      email,
      password,
      phone_number,
      is_admin: role === "admin", // Convert role to boolean
    };

    try {
      await register(userData);
      Swal.fire("Success", "Registration successful!", "success");

      if (onClose) onClose(); // Close modal if provided
    } catch (error) {
      Swal.fire("Error", "Registration failed. Try again.", "error");
    }
  };

  const google_signup = (credential) => {
    const user = jwtDecode(credential);
    console.log("Test ", user);

    userData(
      user.family_name,
      phone_number,
      user.email,
      password,
      user.picture,
      "google.com"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {/* Username */}
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <div className="flex items-center border rounded-md px-3">
          <FaUser className="text-gray-500" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </div>
      </div>
      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <div className="flex items-center border rounded-md px-3">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <div className="flex items-center border rounded-md px-3">
          <FaPhone className="text-gray-500" />
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>
      {/* Password */}
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <div className="flex items-center border rounded-md px-3">
          <FaLock className="text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      {/* Role Selection */}
      <div className="mb-6">
        <label className="block text-gray-700">Register As</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white"
          required
        >
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {/* Register Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Register
      </button>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          google_signup(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
      ;{/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      )}
    </form>
  );
};

export default RegisterForm;
// 414872029170-3u2c5nboldvniesjmkgm0fhtc54a0mld.apps.googleusercontent.com
