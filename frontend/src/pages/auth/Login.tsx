import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login)
  const loading = useAuthStore((state) => state.loading)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () =>{
    try{
      await login(email, password);
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Seu email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              autoComplete="on"
            />
          </div>

          {/* Esqueci minha senha */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            className="w-full bg-primary text-white py-2 rounded-md hover:opacity-90 transition"
            onClick={handleLogin}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>


          <button
            onClick={() => {
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
          }}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Entrar com Google
          </button>
        </div>
      </div>
    </div>
  );
}
