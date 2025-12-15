import axios from 'axios';

export const api = axios.create({
    baseURL: "http://192.168.18.6:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.url?.includes("/auth/login") || config.url?.includes("/auth/register")) {
        return config;
    }

    try {
        const storage = localStorage.getItem("auth-storage");

        if (storage) {
            const parsed = JSON.parse(storage);
            const token = parsed.state?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        console.warn("Erro ao ler auth-storage", error);
    }
    
    return config;  
})