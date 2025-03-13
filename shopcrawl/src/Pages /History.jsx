import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contest/userContext";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const History = () => {
  const { user, token, deleteSearch } = useContext(UserContext); // Add deleteSearch from UserContext
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch search history from the backend
  const fetchSearchHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://shopcrawlbackend-2.onrender.com/searches",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status); // Debugging
      const data = await response.json();
      console.log("Response data:", data); // Debugging

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch search history.");
      }

      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setSearchHistory(data); // Direct array
      } else if (data.searches && Array.isArray(data.searches)) {
        setSearchHistory(data.searches); // Nested array
      } else {
        console.error("Unexpected data format:", data);
        setSearchHistory([]); // Fallback to empty array
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching search history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search history when the user is available
  useEffect(() => {
    if (user) {
      fetchSearchHistory();
    }
  }, [user]);

  // Handle deleting a search history entry
  const handleDelete = async (searchId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteSearch(searchId); // Call deleteSearch from UserContext
        await fetchSearchHistory(); // Refresh the search history after deletion
        Swal.fire(
          "Deleted!",
          "Your search history has been deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting search history:", error);
      Swal.fire("Error", "Failed to delete search history.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Search History</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!Array.isArray(searchHistory) ? (
        <p className="text-gray-600 text-center">Invalid search history data.</p>
      ) : searchHistory.length === 0 ? (
        <p className="text-gray-600 text-center">No search history found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {searchHistory.map((entry) => (
            <li
              key={entry.id}
              className="mb-2 flex justify-between items-center"
            >
              <span>
                {entry.search_query} - {entry.search_date}
              </span>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-white bg-red-600 hover:bg-red-700 p-2 w-10 h-10 flex items-center justify-center border border-red-600 hover:border-red-700 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;