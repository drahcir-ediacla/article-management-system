// import { axiosHandler } from './axiosHandler'
// import { store } from "../redux/store"; // Import Redux store
// import { setAccessToken, clearAccessToken } from "../redux/reducer/tokenSlice"; // Import Redux actions



// // Refresh Access Token
// export const refreshAccessToken = async () => {
//     try {
//         const response = await axiosHandler.get("/api/auth/refresh-token", { 
//             withCredentials: true // ✅ Ensure cookies are sent
//         });

//         const newAccessToken = response.data.accessToken;
//         if (newAccessToken) {
//             store.dispatch(setAccessToken(newAccessToken)); // ✅ Store in Redux
//             return newAccessToken;
//         }
//     } catch (error) {
//         console.error("Refresh token failed", error);

//         // ✅ Handle refresh failure: Clear token & force logout
//         store.dispatch(clearAccessToken());
//         if (typeof window !== "undefined") {
//             window.location.href = "/"; // Redirect to login
//         }
//         return null;
//     }
// };

// // Attach Authorization header to requests
// axiosHandler.interceptors.request.use(
//     async (config) => {
//         const accessToken = store.getState().token.accessToken; // ✅ Get token from Redux
//         console.log("Interceptor Access Token:", accessToken); // ✅ Check token before attaching
//         // if (accessToken) {
//         //     config.headers.Authorization = `Bearer ${accessToken}`;
//         // }
//         if (accessToken) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }

//         console.log("Final Request Headers:", config.headers); // ✅ Log headers

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Axios Response Interceptor (Handles Token Expiration)
// let isRefreshing = false;
// let refreshPromise: Promise<string | null> | null = null;

// axiosHandler.interceptors.response.use(
//     (response) => response, // ✅ Pass through successful responses
//     async (error) => {
//         const originalRequest = error.config;

//         // Prevent refresh logic on authentication routes
//         if (originalRequest.url?.includes("/api/auth")) {
//             return Promise.reject(error);
//         }

//         // If access token expired (401), attempt refresh
//         if (error.response?.status === 401) {
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 refreshPromise = refreshAccessToken(); // ✅ Start refresh process
//             }

//             // ✅ Wait for the refresh process to complete
//             const newAccessToken = await refreshPromise;
//             isRefreshing = false;
//             refreshPromise = null; // ✅ Reset refresh promise

//             if (newAccessToken) {
//                 // ✅ Retry the failed request with the new token
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return axiosHandler(originalRequest);
//             } else {
//                 // ✅ Refresh failed → Force logout
//                 store.dispatch(clearAccessToken());
//                 if (typeof window !== "undefined") {
//                     window.location.href = "/"; // Redirect to login page
//                 }
//                 return Promise.reject(error);
//             }
//         }

//         return Promise.reject(error);
//     }
// );
