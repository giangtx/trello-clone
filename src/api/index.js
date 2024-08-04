import axios from "axios";

export const fetchApi = axios.create({
    baseURL: "http://localhost:3001"
});

fetchApi.interceptors.request.use((config) => {
    config.headers = {
        "Content-Type": "application/json",
    };
    return config;
});

fetchApi.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return {
            error: error?.response?.data,
            data: null,
        };
    }
);

export const getBroads = async () => {
    return await fetchApi.get("/broads");
}

export const createBroad = async ({ title, background }) => {
    return await fetchApi.post("/broads", { title, background });
}

export const getBroad = async (broadId) => {
    return await fetchApi.get(`/broads/${broadId}`);
}

export const updateBroad = async (broadId, data) => {
    return await fetchApi.put(`/broads/${broadId}`, data);
}

export const addColumn = async (broadId, data) => {
    return await fetchApi.put(`/broads/${broadId}/columns`, data);
}

export const addItem = async (columnId, data) => {
    return await fetchApi.put(`/broads/columns/${columnId}/items`, data);
}

export const updatePosition = async (id, data) => {
    return await fetchApi.put(`/broads/${id}/position`, data);
}

export const editItem = async (itemId, data) => {
    return await fetchApi.put(`/broads/items/${itemId}`, data);
}