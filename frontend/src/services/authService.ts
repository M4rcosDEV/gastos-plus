import { api } from "@/services/api";

export const authService = {
    async login(email:string, password:string){
        try {
            const response = await api.post("/auth/login", {email, password})

            return response.data;
            
        } catch (error:any) {

            const message = error.response?.data?.message || "Error when logging in";
            throw new Error(message);
        }
    },
    async getUserForGoogle(token: string) {
        try {
            const response = await api.get("/auth/current-user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}