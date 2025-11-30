import { redirect } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/services/api"; 

export async function authMiddleware({}: any, next: any) {
  const { token, expiresAt, logout, setAuthenticatedUser } = useAuthStore.getState();

  if (!token) {
    logout();
    throw redirect("/login");
  }

  const now = new Date();
  const expires = new Date(expiresAt || 0);
  
  if(now >= expires) {
    console.warn("Token expirado automaticamente.");
    logout();
    throw redirect("/login");
  }

  try {
    const response = await api.get("auth/current-user");
    setAuthenticatedUser(response.data);
    return next();
  } catch (err) {
    logout();
    throw redirect("/login");
  }
}
