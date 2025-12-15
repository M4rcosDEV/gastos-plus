import { api } from "@/services/api";

interface AccountPayload {
    accountName: string;
    avatar?: string;
    balance: number;
    color?: string;
    observation?: string
}

export const accountService = {

    async getAllAccounts() {
        try {
            const response = await api.get("/accounts");
            return response.data;

        } catch (error:any) {
            const message = error.response?.data?.message || "Error retrieving account data.";
            throw new Error(message);
        }
    },

    async create(payload: AccountPayload) {
        try {
            const response = await api.post("/accounts", payload);
            return response.data;   
        } catch (error:any) {
            const message = error.response?.data || "Error creating account.";
            throw new Error(message);
        }
    },

    async update(id: string, payload: AccountPayload) {
        try{
            const response = await api.patch(`/accounts/${id}`, payload);
            return response.data;
        }catch (error:any) {
            const message = error.response || "Error updating account.";
            throw new Error(message.data.message);
        }
    }
}