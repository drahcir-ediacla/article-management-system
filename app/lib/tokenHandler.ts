import { API } from './apiHandler'

// Store access token in memory
let accessToken: string | null = null;

// Set Access Token
export const setAccessToken = (token: string | null) => {
    accessToken = token;
};


//  Refresh Access Token
export const refreshAccessToken = async () => {
    try {
        const response = await API.post("/auth/refresh-token");
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Refresh token failed", error);
        return null;
    }
};

// Axios Request Interceptor (Attach Token Automatically)
API.interceptors.request.use(async (config) => {
    if (!accessToken) {
        accessToken = await refreshAccessToken();
    }
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});