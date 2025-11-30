import { formatMonth } from "@/utils/formatMonth";
import { api } from "./api";

type AuthState = {
    user: any;
    token: string | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
};

type dataResponse = {
  month: string,
  total: number
}

export async function getLast6Months(userId: number, type: "INCOME" | "EXPENSE"):Promise<dataResponse[]> {
  try {
    const response = await api.get(`movement/last-months?userId=${userId}&type=${type}`)

    const formatted = response.data.map((item: dataResponse) => ({
      month: formatMonth(item.month),
      total: item.total
    }));
    return formatted;

  } catch (error:any) {
    const message = error.response?.data?.message || "Error when querying";
    throw new Error(message)
  }
}