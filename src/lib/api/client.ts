import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { config, endpoints } from "./config";
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
  ErrorResponse,
  ApiError,
  Post,
  Menu,
  Settings,
  Footer,
  Advertisement,
  AdvertisementCreateRequest,
  AdvertisementUpdateRequest,
  AdCategory,
  LoginResponse,
} from "./types";

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

export class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: config.backendUrl,
      timeout: config.timeout,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    // Add request interceptor to add token
    this.instance.interceptors.request.use((config) => {
      // Skip adding Authorization header for login and register endpoints
      if (config.url?.endsWith('/login') || config.url?.endsWith('/register')) {
        return config;
      }
      
      // Get token from instance or localStorage
      const token = this.token || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // If no token is found, clear any existing token
        this.clearToken();
        localStorage.removeItem("token");
      }
      return config;
    });

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearToken();
          localStorage.removeItem("token");
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    // Handle network errors
    if (!error.response) {
      console.error('Network error details:', error.message);
      if (error.code === 'ECONNREFUSED') {
        return new ApiError("Backend server is not running. Please start the backend server.");
      }
      return new ApiError(`Network error: ${error.message}`);
    }

    const errorData = error.response.data as ErrorResponse;
    // Only log error details if they exist
    if (errorData.message || errorData.code || errorData.details) {
      console.error('API error details:', {
        status: error.response.status,
        message: errorData.message,
        code: errorData.code,
        details: errorData.details
      });
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 500:
        return new ApiError(
          "Backend server error. Please check the backend logs.",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 400:
        return new ApiError(
          errorData.message || "Bad request: Please check your input",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 401:
        return new ApiError(
          errorData.message || "Unauthorized: Please log in again",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 403:
        return new ApiError(
          errorData.message || "Forbidden: You don't have permission to perform this action",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 404:
        return new ApiError(
          errorData.message || "Resource not found",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 409:
        return new ApiError(
          errorData.message || "Conflict: The resource already exists",
          error.response.status,
          errorData.code,
          errorData.details
        );
      default:
        return new ApiError(
          errorData.message || "An unexpected error occurred",
          error.response.status,
          errorData.code,
          errorData.details
        );
    }
  }

  setToken(token: string | null) {
    this.token = token;
  }

  clearToken() {
    this.setToken(null);
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log('Attempting login with:', { email });
      const response = await this.instance.post<LoginResponse>(endpoints.auth.login, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        validateStatus: (status) => status < 500, // Accept all status codes less than 500
      });
      
      console.log('Login response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      if (response.status === 401) {
        const errorMessage = response.data?.error || 'Invalid credentials';
        console.error('Login failed:', errorMessage);
        throw new Error(errorMessage);
      }
      
      if (!response.data || !response.data.token) {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from server');
      }
      
      this.setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      return {
        token: response.data.token,
        message: response.data.message,
        user: response.data.user
      };
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          }
        });
        
        const errorMessage = error.response?.data?.error || 'Login failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.instance.post<{ data: AuthResponse }>(
      endpoints.auth.register,
      data
    );
    this.setToken(response.data.data.token);
    localStorage.setItem("token", response.data.data.token);
    return response.data.data;
  }

  async logout(): Promise<void> {
    try {
      await this.instance.post(endpoints.auth.logout);
    } finally {
      this.clearToken();
      localStorage.removeItem("token");
    }
  }

  async getProfile(): Promise<User> {
    const response = await this.instance.get<{ data: User }>(
      endpoints.users.profile
    );
    return response.data.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.instance.put<{ data: User }>(
      endpoints.users.updateProfile,
      data
    );
    return response.data.data;
  }

  // Content methods
  async getContent(): Promise<Content> {
    try {
      const response = await this.instance.get<{ data: Content }>(endpoints.content.get);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          this.clearToken();
          localStorage.removeItem("token");
          throw new Error('Session expired. Please log in again.');
        }
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to fetch content';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async updateContent(section: string, data: any): Promise<Content> {
    const response = await this.instance.post<{ data: Content }>(
      endpoints.content.update,
      {
        section,
        data,
      }
    );
    return response.data.data;
  }

  async updateLawContent(lawId: string, data: Partial<LawItem>): Promise<Content> {
    const response = await this.instance.put<{ data: Content }>(
      endpoints.content.updateLaw(lawId),
      data
    );
    return response.data.data;
  }

  // Post methods
  async listPosts(): Promise<Post[]> {
    const response = await this.instance.get<{ data: Post[] }>(
      endpoints.posts.list
    );
    return response.data.data;
  }

  async getPost(id: string): Promise<Post> {
    const response = await this.instance.get<{ data: Post }>(
      endpoints.posts.get(id)
    );
    return response.data.data;
  }

  // Menu methods
  async listMenus(): Promise<Menu[]> {
    const response = await this.instance.get<{ data: Menu[] }>(
      endpoints.menus.list
    );
    return response.data.data;
  }

  // Settings methods
  async getSettings(): Promise<Settings> {
    const response = await this.instance.get<{ data: Settings }>(
      endpoints.settings.get
    );
    return response.data.data;
  }

  // Footer methods
  async getFooter(): Promise<Footer> {
    const response = await this.instance.get<{ data: Footer }>(
      endpoints.footer.get
    );
    return response.data.data;
  }

  // Advertisement methods
  async listAdvertisements(): Promise<Advertisement[]> {
    const response = await this.instance.get<{ data: Advertisement[] }>(
      endpoints.advertisements.list
    );
    return response.data.data;
  }

  async createAdvertisement(data: AdvertisementCreateRequest): Promise<Advertisement> {
    const response = await this.instance.post<{ data: Advertisement }>(
      endpoints.advertisements.create,
      data
    );
    return response.data.data;
  }

  async listMyAdvertisements(): Promise<Advertisement[]> {
    const response = await this.instance.get<{ data: Advertisement[] }>(
      endpoints.advertisements.my
    );
    return response.data.data;
  }

  async updateAdvertisement(id: string, data: AdvertisementUpdateRequest): Promise<Advertisement> {
    const response = await this.instance.put<{ data: Advertisement }>(
      endpoints.advertisements.update(id),
      data
    );
    return response.data.data;
  }

  async deleteAdvertisement(id: string): Promise<void> {
    await this.instance.delete(endpoints.advertisements.delete(id));
  }

  // Ad Category methods
  async listAdCategories(): Promise<AdCategory[]> {
    const response = await this.instance.get<{ data: AdCategory[] }>(
      endpoints.adCategories.list
    );
    return response.data.data;
  }

  async validateToken(): Promise<boolean> {
    try {
      const response = await this.instance.get(`${config.backendUrl}/auth/validate-token`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
