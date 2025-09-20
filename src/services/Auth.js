// src/services/Auth.js
import { api } from "../api";

export async function loginAndGetUser({ email, password }) {
  try {
    const { data } = await api.post("/login", { email, password });
    
    const token = data.accessToken || data.token;
    const user = data.user || {};

    if (token) {
      localStorage.setItem("token", token);
    }

    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
    
  } catch (error) {
    console.error("Erro no login:", error);
    
    if (error.response?.status === 401) {
      throw new Error("Email ou senha inválidos");
    } else if (error.response?.status >= 500) {
      throw new Error("Erro no servidor. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro ao fazer login. Verifique sua conexão.");
    }
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

// Verificar se o usuário está autenticado
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Obter token
export function getToken() {
  return localStorage.getItem("token");
}