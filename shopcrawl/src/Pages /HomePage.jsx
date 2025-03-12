import React, { useState } from "react";
import { useProducts } from "../Contest/ProductContext";

const HomePage = () => {
  const { products, loading, searchTerm } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) return <p>Loading products...</p>;

  // Filter and automatically sort products
  const filteredProducts = products
    .filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.product_rating - a.product_rating); // Default sorting by rating

  // Array of Tailwind CSS background color classes
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-indigo-100",
    "bg-red-100",
    "bg-gray-100",
  ];

  // Function to get a color class based on the product's index
  const getColorClass = (index) => {
    return colors[index % colors.length]; // Cycle through the colors array
  };

  // Function to handle image click and redirect to navigate_link
  const handleImageClick = (navigateLink) => {
    if (navigateLink) {
      window.open(navigateLink, "_blank"); // Open link in a new tab
    } else {
      console.error("No navigation link provided for this product.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`border p-4 rounded-lg shadow-md ${getColorClass(
                index
              )}`}
            >
              {/* Responsive image acting as a button */}
              <div
                className="w-full h-40 overflow-hidden rounded-md cursor-pointer"
                onClick={() => handleImageClick(product.navigate_link)} // Use navigate_link
              >
                <img
                  src={product.product_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product details */}
              <div className="mt-2">
                <p className="text-lg font-semibold">{product.product_name}</p>
                <p className="text-lg font-semibold">
                  Ksh {product.product_price}
                </p>
                <p className="text-sm text-yellow-600">{product.shop_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
