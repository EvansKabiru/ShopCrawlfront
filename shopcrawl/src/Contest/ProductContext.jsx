import { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("price"); // 🔹 Sorting state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://shopcrawlbackend.onrender.com/products"
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const createProduct = async (productData, token) => {
    try {
      const response = await fetch("https://shopcrawlbackend.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id, token) => {
    try {
      const response = await fetch(`https://shopcrawlbackend.onrender.com/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        createProduct,
        deleteProduct,
        searchTerm,
        setSearchTerm,
        sortProducts,
        sortCriteria,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
