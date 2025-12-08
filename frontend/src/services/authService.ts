import { api } from "./api";

export const authService = {
    async login(email:string, password:string){
        try {
            const response = await api.post("/auth/login", {email, password})

            return response.data;
            
        } catch (error:any) {
            const message = error.response?.data?.message || "Error when logging in";
            throw new Error(message);
        }
    }
}