import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore"; 

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loginWithToken = useAuthStore((state) => state.loginWithToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = searchParams.get("token");
    console.log(token)
    if (!token) {
      navigate("/login");
      return;
    }

    const loginWithGoogle = async() =>{
      logout();
      try {
        await loginWithToken(token)
        navigate("/")
        console.log("sucesso")
      } catch (error) {
        navigate("/login")
        console.log(error)
      }
    }

    loginWithGoogle();

  }, [searchParams, navigate, loginWithToken]);

  return (
    <div className="flex h-screen items-center justify-center">
      <span className="text-muted-foreground">Autenticando...</span>
    </div>
  );
}
