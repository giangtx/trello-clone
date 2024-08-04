import { fetchApi } from ".";

export const login = async (data) => {
    return await fetchApi.post("/auth/login", data);
}

export const register = async (data) => {
    return await fetchApi.post("/auth/register", data);
}

export const getInfo = async () => {
    return await fetchApi.get("/auth/me");
}