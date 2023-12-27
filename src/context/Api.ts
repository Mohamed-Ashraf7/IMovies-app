import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
axiosClient.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: "ea367cbd5025a29da2b73633f4e064cd",
    },
  };
});
