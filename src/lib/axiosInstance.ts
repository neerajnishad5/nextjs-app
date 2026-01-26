import axios from "redaxios";

/**
 * Axios-like instance for CLIENT COMPONENTS

 * - Central place for headers, baseURL, interceptors
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * (runs before every request)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach auth token
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 * (runs after every response)
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error?.status === 401) {
      console.warn("Unauthorized – redirect to login");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
