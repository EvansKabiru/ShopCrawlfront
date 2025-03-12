import { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 🔹 Added error state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("rating"); // Default sorting by rating

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://shopcrawlbackend-2.onrender.com/products"
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Fetch products error:", error);
      setError("Failed to load products. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Sort products based on criteria
  const sortProducts = (criteria) => {
    setSortCriteria(criteria);
    let sortedProducts = [...products];
    switch (criteria) {
      case "price":
        sortedProducts.sort((a, b) => b.product_price - a.product_price);
        break;
      case "delivery":
        sortedProducts.sort((a, b) => a.delivery_cost - b.delivery_cost);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.product_rating - a.product_rating);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  // Create a new product
  const createProduct = async (productData, token) => {
    try {
      const response = await fetch(
        "https://shopcrawlbackend-2.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) throw new Error("Failed to create product");

      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Create product error:", error);
      setError("Failed to create product. Please try again."); // Set error message
    }
  };

  // Delete a product
  const deleteProduct = async (id, token) => {
    try {
      const response = await fetch(
        `https://shopcrawlbackend-2.onrender.com/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Delete product error:", error);
      setError("Failed to delete product. Please try again."); // Set error message
    }
  };

  // Update a product
  const updateProduct = async (id, updatedData, token) => {
    try {
      const response = await fetch(`https://shopcrawlbackend-2.onrender.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Update product error:", error);
      setError("Failed to update product. Please try again."); // Set error message
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts, // Return filtered products
        loading,
        error, // Provide error state
        createProduct,
        deleteProduct,
        updateProduct, // Provide update function
        searchTerm,
        setSearchTerm,
        sortProducts,
        sortCriteria,
        fetchProducts, // Allow manual refetching
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
