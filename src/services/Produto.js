// src/services/Produto.js
import { api } from "../api";

export async function getProducts() {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}