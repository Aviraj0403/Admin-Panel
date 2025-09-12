import axios from "axios";

// const baseURL = "https://restro-back-jgry.onrender.com/v1/api"; // Production
const baseURL = "http://localhost:5005/v1/api"; // Local development
const Axios = axios.create({
  baseURL,
  withCredentials: true, // send cookies
});

Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 👉 Skip refresh logic if the failing endpoint is /me
    const isMeRoute = originalRequest.url?.includes("/auth/me");

    if (err.response?.status === 401 && !originalRequest._retry && !isMeRoute) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        return Axios(originalRequest); // Retry the original request
      } catch (refreshErr) {
        console.error("❌ Refresh token failed. Redirecting to login.");

        localStorage.removeItem("user");
        sessionStorage.clear();
        window.location.href = "/signin"; // Redirect to login
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default Axios;
