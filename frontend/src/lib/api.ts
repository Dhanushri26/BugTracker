const DEFAULT_API_URL = "https://bugtracker-8kty.onrender.com";

const envApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (envApiUrl || DEFAULT_API_URL).replace(/\/$/, "");

export interface AuthResponse {
  message: string;
  token: string;
  user: LocalUser;
}

export interface LocalUser {
  id?: string;
  name: string;
  email: string;
  team: string;
  isVerified?: boolean;
}

// Auth API calls
export const authAPI = {
  signup: async (email: string, password: string, name: string, team: string) => {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, team }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    return response.json();
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  updateTeam: async (email: string, team: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${email}/team`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ team }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Update failed');
    }

    return response.json();
  },
};
