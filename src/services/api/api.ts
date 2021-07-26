import axios from 'axios';
import config from 'src/config';
axios.defaults.baseURL = config.apiUrl;
export const apiClient = axios.create();

apiClient.interceptors.request.use(
    async (config) => {
        const userIdToken = localStorage.getItem('token');
        if (userIdToken) {
            config.headers.Authorization = 'Bearer ' + userIdToken;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
