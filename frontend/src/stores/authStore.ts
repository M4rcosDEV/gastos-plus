import { authService } from "@/services/authService";
import {create} from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    user: any;
    token: string | null;
    loading: boolean;
    expiresAt: string | null;

    setAuthenticatedUser: (user: any) => void;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithToken: (token: string) => Promise<boolean>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      expiresAt: null,

      setAuthenticatedUser: (user: any) => {
        set({ user , loading: false });
      },

      login: async (email: string, password: string) => {
        set({ loading: true });

        try {
          const data = await authService.login(email, password);

          set({
            user: data.user,
            token: data.token,
            expiresAt: data.expiresIn,
            loading: false,
          });

          return true;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      loginWithToken: async (token: string) => {
        set({ loading: true });

        try {
          
          const user = await authService.getUserForGoogle(token);
          console.log(token)
          console.log(user)
  
          set({
            user: user,
            token: token,
            expiresAt: "2025-12-10T07:46:17Z",
            loading: false,
          });

          return true;
        } catch (error) {
          console.error("Falha ao logar com token", error);

          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          expiresAt: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);