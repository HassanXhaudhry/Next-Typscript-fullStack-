import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/");
    if (!Array.isArray(response.data)) {
      return [];
    }
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return [];
  }
};
