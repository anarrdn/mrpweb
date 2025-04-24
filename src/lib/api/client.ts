import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  name: string;
  pharmacyId: string;
  pharmacyAddress: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  pharmacyId: string;
  pharmacyAddress: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface Content {
  // Define the structure of the content object
}

export interface LawItem {
  // Define the structure of the law item object
}

export class ApiClient {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;
  private readonly TOKEN_COOKIE = "token";
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.token = Cookies.get(this.TOKEN_COOKIE) || null;
  }

  // Token management
  public setToken(token: string | null) {
    if (token) {
      Cookies.set(this.TOKEN_COOKIE, token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } else {
      Cookies.remove(this.TOKEN_COOKIE);
    }
  }

  public getToken(): string | null {
    return Cookies.get(this.TOKEN_COOKIE) || null;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  // Auth endpoints
  public async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.axiosInstance.post<LoginResponse>(
      "/auth/login",
      data
    );
    return response.data;
  }

  public async register(data: RegisterRequest): Promise<User> {
    const response = await this.axiosInstance.post<User>(
      "/auth/register",
      data
    );
    return response.data;
  }

  public async getProfile(): Promise<User> {
    const response = await this.axiosInstance.get<User>("/auth/profile");
    return response.data;
  }

  public async refreshToken(): Promise<LoginResponse> {
    const response = await this.axiosInstance.post<LoginResponse>(
      "/auth/refresh"
    );
    return response.data;
  }

  // Admin endpoints
  public async listUsers(): Promise<ApiResponse<User[]>> {
    const response = await axios.get(`${this.baseUrl}/admin/users`, {
      headers: this.headers,
    });
    return response.data;
  }

  public async approveUser(userId: string): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${this.baseUrl}/admin/users/${userId}/approve`,
      {},
      { headers: this.headers }
    );
    return response.data;
  }

  public async rejectUser(userId: string): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${this.baseUrl}/admin/users/${userId}/reject`,
      {},
      { headers: this.headers }
    );
    return response.data;
  }

  public async updateUserPremium(
    userId: string,
    isPremium: boolean
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${this.baseUrl}/admin/users/${userId}/premium`,
      { isPremium },
      { headers: this.headers }
    );
    return response.data;
  }

  public async updateUserRole(
    userId: string,
    role: "USER" | "ADMIN"
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${this.baseUrl}/admin/users/${userId}/role`,
      { role },
      { headers: this.headers }
    );
    return response.data;
  }

  public async updateUserStatus(
    userId: string,
    status: "PENDING" | "APPROVED" | "REJECTED"
  ): Promise<ApiResponse<User>> {
    const response = await axios.put(
      `${this.baseUrl}/admin/users/${userId}/status`,
      { status },
      { headers: this.headers }
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

export const api = new ApiClient();
