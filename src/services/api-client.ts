import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.headers) {
      config.headers["x-hasura-user-id"] =
        import.meta.env.VITE_HASURA_USER_ID || "2";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Başarılı cevapları direkt data ile döndür
    return response.data;
  },
  (error) => {
    // Hata mesajlarını standartlaştır
    const message =
      error.response?.data?.message || "An error occurred while fetching data";

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
