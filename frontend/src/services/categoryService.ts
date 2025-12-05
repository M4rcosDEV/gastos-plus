import { api } from "@/services/api";

interface CategoryPayload {
    name: string;
    icon?: string;
    color?: string;
    observacao?: string;
}

export const categoryService = {
    async createCategory(payload: CategoryPayload) {
        try {
            const response = await api.post("/category", payload);
            return response.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }
}