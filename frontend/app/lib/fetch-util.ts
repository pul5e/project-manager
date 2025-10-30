import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api-v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token ?? ""}`; //Bearer token
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  }
);

// const postData = async <T>(path: string, data: unknown): Promise<T> => {
//   const response = await api.post(path, data);
//   return response.data;
// };

const postData = async <T>(path: string, data: unknown): Promise<T> => {
  try {
    const response = await api.post(path, data);
    return response.data;
  } catch (error: any) {
    // Handle API errors gracefully
    const message = error.response?.data?.message || "Request failed";
    throw new Error(message); // throw simplified error for easier catch
  }
};

const fetchData = async <T>(path: string): Promise<T> => {
  const response = await api.get(path);
  return response.data;
};

const updateData = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await api.put(path, data);
  return response.data;
};

const deleteData = async <T>(path: string): Promise<T> => {
  const response = await api.delete(path);
  return response.data;
};

export { postData, fetchData, updateData, deleteData };

// const fetchData = async (path: string, options: RequestInit = {}) => {
//     const response = await fetch(`${BASE_URL}/${path}`, options);
//     return response.json();
// }
