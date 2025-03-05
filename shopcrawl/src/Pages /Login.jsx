import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { UserContext } from "../Contest/userContext"; // Adjust the path as needed
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Ensure you have these icons installed
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode


const Login = ({ onClose }) => {
  const { login, login_with_google } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      if (onClose) onClose();
      Swal.fire("Success", "You have successfully logged in!", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "An error occurred. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Reset Password",
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return fetch("/request-password-reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success",
          "Password reset link sent to your email!",
          "success"
        );
      }
    });
  };

  const handleGoogleLogin = (credential) => {
   
      const user_details = jwtDecode(credential); // Decode the JWT token
      login_with_google(user_details.email); // Call your Google login function
    
  };

  return (
    <GoogleOAuthProvider clientId="414872029170-3u2c5nboldvniesjmkgm0fhtc54a0mld.apps.googleusercontent.com">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            aria-label="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {/* Google Login Button */}
        <GoogleLogin
          onClick 
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
             onClose() 
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />

        {/* Forgot Password Button */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full mt-2 text-blue-600 hover:text-blue-800"
        >
          Forgot Password?
        </button>

        {/* Close Button (if modal) */}
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
    </GoogleOAuthProvider>
  );
};

export default Login;
