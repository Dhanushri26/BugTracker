const DEFAULT_API_URL = "https://bugtracker-8kty.onrender.com";

const envApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (envApiUrl || DEFAULT_API_URL).replace(/\/$/, "");
