import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa"; // Importing icons

// Dummy data for categories and products
const categories = [
  {
    id: 1,
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Accessories"],
    products: [
      { id: 1, name: "iPhone 13", price: 999 },
      { id: 2, name: "MacBook Pro", price: 1999 },
      { id: 3, name: "AirPods Pro", price: 249 },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    subcategories: ["Men", "Women", "Kids"],
    products: [
      { id: 4, name: "Men's T-Shirt", price: 25 },
      { id: 5, name: "Women's Dress", price: 50 },
      { id: 6, name: "Kids' Jacket", price: 35 },
    ],
  },
  {
    id: 3,
    name: "Home & Kitchen",
    subcategories: ["Furniture", "Cookware", "Decor"],
    products: [
      { id: 7, name: "Sofa", price: 499 },
      { id: 8, name: "Non-Stick Pan", price: 39 },
      { id: 9, name: "Wall Art", price: 29 },
    ],
  },
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "" });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(category.products);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (selectedCategory) {
      const filtered = selectedCategory.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    if (selectedCategory) {
      const filtered = selectedCategory.products.filter((product) => {
        const meetsMinPrice = filters.minPrice
          ? product.price >= parseFloat(filters.minPrice)
          : true;
        const meetsMaxPrice = filters.maxPrice
          ? product.price <= parseFloat(filters.maxPrice)
          : true;
        return meetsMinPrice && meetsMaxPrice;
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Category List */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedCategory?.id === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <h2 className="font-semibold">{category.name}</h2>
            <p className="text-sm text-gray-600">
              {category.subcategories.join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      {selectedCategory && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />{" "}
              {/* Search icon */}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaFilter /> {/* Filter icon */}
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Display */}
      {selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
