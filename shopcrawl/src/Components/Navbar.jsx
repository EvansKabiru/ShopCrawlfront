import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contest/userContext";
import { useProducts } from "../Contest/ProductContext"; // Import useProducts
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaCaretDown,
  FaCaretUp,
  FaHome,
  FaHistory,
  FaSignOutAlt,
  FaTimes,
  FaCog,
} from "react-icons/fa";
import Login from "../Pages /Login";
import Register from "../Pages /Register";

const Navbar = () => {
  const { user, logout, saveSearch } = useContext(UserContext);
  const { setSearchTerm } = useProducts(); // Use setSearchTerm from ProductContext
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle dropdowns and modals
  const toggleShopDropdown = () => setIsShopDropdownOpen(!isShopDropdownOpen);
  const toggleCategoryDropdown = () =>
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  const openSignInModal = () => setIsSignInModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeModals = () => {
    setIsSignInModalOpen(false);
    setIsRegisterModalOpen(false);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle search input
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchTerm(query); // Update the search term in ProductContext

    // Save search query to backend if user is logged in
    if (user) {
      try {
        await saveSearch(query); // Use the saveSearch function from UserContext
      } catch (error) {
        console.error("Error saving search query:", error);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 flex items-center"
      >
        <FaHome className="mr-2" /> ShopCrawl
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-gray-700 hover:text-blue-600"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Search Bar */}
      <div className="relative flex-grow mx-8 max-w-md hidden md:flex">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
          className="w-full px-3 py-1 border rounded-l-md focus:ring-blue-500"
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700"
        >
          <FaSearch />
        </button>
      </div>

      {/* Mobile Search Bar */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            className="w-full px-3 py-1 border rounded-md focus:ring-blue-500"
          />
        </div>
      )}

      {/* Navigation Links */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-16 p-4 md:p-0 shadow-md md:shadow-none`}
      >
        {/* Shops Dropdown */}
        <div className="relative z-50">
          <button
            onClick={toggleShopDropdown}
            className="flex items-center text-gray-700 hover:text-blue-600"
            aria-expanded={isShopDropdownOpen}
          >
            Shops{" "}
            {isShopDropdownOpen ? (
              <FaCaretUp className="ml-1" />
            ) : (
              <FaCaretDown className="ml-1" />
            )}
          </button>
          {isShopDropdownOpen && (
            <div className="absolute bg-white shadow-md mt-2 rounded-md p-2">
              <a
                href="https://www.jumia.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Jumia
              </a>
              <a
                href="https://www.kilimall.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Kilimall
              </a>
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Amazon
              </a>
              <a
                href="https://www.alibaba.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Alibaba
              </a>
            </div>
          )}
        </div>

     

        {/* User Actions */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          {user ? (
            <>
              {/* History Icon */}
              <Link
                to="/history"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <FaHistory className="mr-1" /> History
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              {/* Login and Register Buttons */}
              <button
                onClick={openSignInModal}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <FaSignInAlt className="mr-1" /> Login
              </button>
              <button
                onClick={openRegisterModal}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <FaUserPlus className="mr-1" /> Register
              </button>
            </>
          )}

          {/* Admin Dashboard Link */}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <FaCog className="mr-1" /> Admin Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Modals */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <Login onClose={closeModals} />
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <Register onClose={closeModals} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
