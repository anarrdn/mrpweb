import axios, { AxiosInstance } from "axios";
import { config } from "../config";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  isApproved: boolean;
  pharmacyName?: string;
  pharmacyRegisterNumber?: string;
  pharmacyAddress?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  pharmacyName: string;
  payment_proof: string;
  pharmacyRegisterNumber: string;
  pharmacyAddress: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface Content {
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage: string | null;
  };
  // Add other content sections as needed
}

export interface LawItem {
  // Define the structure of the law item object
}

class ApiClient {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;
  private authRequiredPaths = ["/auth/profile", "/admin/", "/api/content"];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.backendUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const isAuthRequiredPath = this.authRequiredPaths.some((path) =>
          error.config?.url?.startsWith(path)
        );

        if (error.response?.status === 401 && isAuthRequiredPath) {
          // Clear token and redirect to login only for auth-required paths
          this.clearToken();
          window.location.href = "/auth/login";
        }
        return Promise.reject(this.handleError(error));
      }
    );

    // Add request interceptor to add token
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  private handleError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.response?.data?.error) {
      return new Error(error.response.data.error);
    }
    return new Error("An unexpected error occurred");
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  clearToken() {
    this.setToken(null);
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );
    this.setToken(response.data.token);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>(
      "/auth/register",
      data
    );
    this.setToken(response.data.token);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.axiosInstance.post("/auth/logout");
    } finally {
      this.clearToken();
    }
  }

  async getProfile(): Promise<User> {
    const response = await this.axiosInstance.get<User>("/auth/profile");
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.axiosInstance.put<User>("/auth/profile", data);
    return response.data;
  }

  // Admin endpoints
  public async listUsers(): Promise<ApiResponse<User[]>> {
    const response = await axios.get(`${config.backendUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }

  public async approveUser(userId: string): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${config.backendUrl}/admin/users/${userId}/approve`,
      {},
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  public async rejectUser(userId: string): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${config.backendUrl}/admin/users/${userId}/reject`,
      {},
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  public async updateUserPremium(
    userId: string,
    isPremium: boolean
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${config.backendUrl}/admin/users/${userId}/premium`,
      { isPremium },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  public async updateUserRole(
    userId: string,
    role: "USER" | "ADMIN"
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${config.backendUrl}/admin/users/${userId}/role`,
      { role },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  public async updateUserStatus(
    userId: string,
    status: "PENDING" | "APPROVED" | "REJECTED"
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${config.backendUrl}/admin/users/${userId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return response.data;
  }

  // Content endpoints
  public async getContent(): Promise<ApiResponse<Content>> {
    const response = await this.axiosInstance.get<ApiResponse<Content>>(
      `/api/content`
    );
    return response.data;
  }

  public async updateContent(
    section: string,
    data: any
  ): Promise<ApiResponse<Content>> {
    const response = await this.axiosInstance.post<ApiResponse<Content>>(
      `/api/content`,
      {
        section,
        data,
      }
    );
    return response.data;
  }

  public async updateLawContent(
    lawId: string,
    data: Partial<LawItem>
  ): Promise<ApiResponse<Content>> {
    const response = await this.axiosInstance.put<ApiResponse<Content>>(
      `/api/content/laws/${lawId}`,
      data
    );
    return response.data;
  }
}

export const apiClient = new ApiClient();
