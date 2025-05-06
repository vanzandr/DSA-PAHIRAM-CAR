import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // adjust as needed
});

// Automatically attach token to all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;