import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

// API Endpoints (Centralized for easy maintenance)
const API_ENDPOINTS = {
  LOGIN: "https://shopcrawlbackend-2.onrender.com/login",
  REGISTER: "https://shopcrawlbackend-2.onrender.com/register",
  FETCH_USER: "https://shopcrawlbackend-2.onrender.com/me",
  SAVE_SEARCH: "https://shopcrawlbackend-2.onrender.com/save-search",
  FETCH_SEARCH_HISTORY: "https://shopcrawlbackend-2.onrender.com/search-history",
  DELETE_SEARCH: "https://shopcrawlbackend-2.onrender.com/delete-search",
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false); // Track loading state
  const [searchHistory, setSearchHistory] = useState([]); // Store user's search history

  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token); // Save token
        setToken(data.access_token); // Update token state
        setUser(data.user); // Update user state
        Swal.fire("Success", "Login successful!", "success");
      } else {
        Swal.fire("Error", data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Error", "Something went wrong during login.", "error");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN WITH GOOGLE
  const login_with_google = (email) => {
   
    fetch("https://shopcrawlbackend-2.onrender.com/login_with_google", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log("mkjhg");
        
        if (response.access_token) {
          
          sessionStorage.setItem("token", response.access_token);
          setToken(response.access_token);

          fetch("https://shopcrawlbackend-2.onrender.com/current_user", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${response.access_token}`,
            },
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.email) {
                setCurrentUser(response);
              }
            });

         
        } else if (response.error) {
         
         
        } else {
         
        }
      });
  };

  // Function to handle user registration
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          "Registration successful! Please log in.",
          "success"
        );
      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", "Something went wrong during registration.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch current user details
  const fetchUser = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.FETCH_USER, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        logout(); // Log out if token is invalid
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Log out on error
    } finally {
      setLoading(false);
    }
  };

  // Function to save search history
  const saveSearch = async (searchQuery) => {
    if (!user) {
      Swal.fire(
        "Error",
        "You must be logged in to save search history",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SAVE_SEARCH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure user authentication
        },
        body: JSON.stringify({
          search_query: searchQuery,
          user_id: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Search history saved!", "success");
        fetchSearchHistory(); // Refresh search history after saving
      } else {
        Swal.fire("Error", data.error || "Failed to save search", "error");
      }
    } catch (error) {
      console.error("Search save error:", error);
      Swal.fire("Error", "Something went wrong while saving search.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch search history
  const fetchSearchHistory = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.FETCH_SEARCH_HISTORY, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSearchHistory(data);
      } else {
        Swal.fire(
          "Error",
          data.error || "Failed to fetch search history",
          "error"
        );
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
      Swal.fire(
        "Error",
        "Something went wrong while fetching search history.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a search history entry
  const deleteSearch = async (searchId) => {
    if (!user) {
      Swal.fire(
        "Error",
        "You must be logged in to delete search history",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.DELETE_SEARCH}/${searchId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Search history deleted!", "success");
        fetchSearchHistory(); // Refresh search history after deletion
      } else {
        Swal.fire("Error", data.error || "Failed to delete search", "error");
      }
    } catch (error) {
      console.error("Search delete error:", error);
      Swal.fire(
        "Error",
        "Something went wrong while deleting search.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSearchHistory([]); // Clear search history on logout
    Swal.fire("Logged out", "You have been logged out successfully.", "info");
  };

  // Fetch user details on initial load if token exists
  useEffect(() => {
    if (token) {
      fetchUser();
      fetchSearchHistory(); // Fetch search history when user logs in
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        searchHistory,
        login,
        login_with_google,
        register,
        logout,
        saveSearch,
        fetchSearchHistory,
        deleteSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
