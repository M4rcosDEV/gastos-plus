import { api } from "@/services/api";
import type { MovementPayload } from "@/interfaces/movement";

export const movementService = {
    async createMovement(payload: MovementPayload){
        try {
            const response = await api.post("/movement", payload)
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Error when querying";
            throw new Error(message);
        }
    }
}