import type { CardsDashboardData } from "@/interfaces/CardsDashboardData";
import { api } from "@/services/api";
import { formatMonth } from "@/utils/formatMonth";

interface dataResponse {
  month: string,
  total: number
}

export const dashboardService = {
    async getBalanceTotal():Promise<CardsDashboardData>{
        console.log("Consultou")
        try {
            const response = await api.get("/movement/balance/month");
            return response.data;
        } catch (error) {
            console.error("Error fetching balance total:", error);
            throw error;
        }
    },
    async getIncome():Promise<CardsDashboardData>{
        try {
            const response = await api.get("/movement/income/month");
            return response.data;
        } catch (error) {
            console.error("Error fetching income total:", error);
            throw error;
        }
    },
    async getExpense():Promise<CardsDashboardData>{
        try {
            const response = await api.get("/movement/expense/month");
            return response.data;
        } catch (error) {
            console.error("Error fetching income total:", error);
            throw error;
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