import { formatMonth } from "@/utils/formatMonth";
import { api } from "./api";
import type { MovementPayload } from "@/interfaces/movement";

interface dataResponse {
  month: string,
  total: number
}

export const movementService = {
    async createMovement(payload: MovementPayload){
        try {
            const response = await api.post("/movement", payload)
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Error when querying";
            throw new Error(message);
        }
    },
    async getLast6Months(userId: number, type: "INCOME" | "EXPENSE"){
        try {
            const response = await api.get(`/movement/last-months?userId=${userId}&type=${type}`)

            const formatted = response.data.map((item: dataResponse) => ({
            month: formatMonth(item.month),
            total: item.total
            }));
            return formatted;

        } catch (error:any) {
            const message = error.response?.data?.message || "Error when querying";
            throw new Error(message);
        }
    }
}