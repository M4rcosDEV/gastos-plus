import { api } from "@/services/api";

interface CategoryPayload {
    name: string;
    icon?: string;
    color?: string;
    observacao?: string;
}

export const categoryService = {
    async getCategories() {
        try {
            const response = await api.get("/category"); 
            return response.data;
            
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    async createCategory(payload: CategoryPayload) {
        try {
            const response = await api.post("/category", payload);
            return response.data;
        } catch (error: any) {
            console.error(error.response?.data);
            throw error.response?.data;
        }
    }
}