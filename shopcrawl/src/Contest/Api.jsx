import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // Your Flask backend

const fetchJumiaProducts = async () => {
  try {
    const response = await axios.get("https://api.jumia.com/search");
    return response.data;
  } catch (error) {
    console.error("Error fetching Jumia products:", error);
    return [];
  }
};

const fetchKilimallProducts = async () => {
  try {
    const response = await axios.get("https://www.kilimall.co.ke/search");
    return response.data;
  } catch (error) {
    console.error("Error fetching Kilimall products:", error);
    return [];
  }
};
export const fetchAmazonProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/amazon-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Amazon products:", error);
    return [];
  }
};

export const fetchAlibabaProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/alibaba-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Alibaba products:", error);
    return [];
  }
};

// ✅ Ensure all functions are properly exported
export {
  fetchJumiaProducts,
  fetchKilimallProducts,
 
};
