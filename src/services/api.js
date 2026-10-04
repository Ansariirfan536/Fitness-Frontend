import axios from "axios";

// API Gateway ka URL (Port 8080)
const API_URL = "http://localhost:8080/api"; 

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (userId) {
        config.headers["X-User-ID"] = userId;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getActivities = () => api.get("/activities");
export const addActivity = (activity) => api.post("/activities", activity);

// Yeh dono alag-alag chahiye kyunki ek activity data laata hai aur doosra AI recommendation
export const getActivityById = (id) => api.get(`/activities/${id}`);
export const getActivityRecommendation = (id) => api.get(`/recommendations/activity/${id}`);