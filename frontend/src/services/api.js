import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000, // configurable API timeout in ms
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Add debug logging
    console.debug("API Request:", {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/users/me"),
};

// Course API
export const courseAPI = {
  getAllCourses: (params) => api.get("/courses", { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post("/courses", courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  getCourseContent: (id, params) =>
    api.get(`/courses/${id}/content`, { params }),
};

// Content API
export const contentAPI = {
  getAllContent: (params) => api.get("/content", { params }),
  getContentById: (id) => api.get(`/content/${id}`),
  uploadContent: (formData) => {
    console.debug("Uploading content:", formData);
    // console.debug("formdata.content", formData.get("content"));
    return api.post("/content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateContent: (id, contentData) => api.put(`/content/${id}`, contentData),
  deleteContent: (id) => api.delete(`/content/${id}`),
  downloadContent: (id) =>
    api.get(`/content/${id}/file`, { responseType: "blob" }),
  searchContent: (searchParams) =>
    api.get("/content/search", { params: searchParams }),
};

export default api;
