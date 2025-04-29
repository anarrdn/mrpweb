import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { apiConfig, endpoints } from "./config";
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
  Notification,
  FooterSection,
  FooterCreateRequest,
  FooterUpdateRequest,
} from "./types";

export interface Content {
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage: string | null;
  };
  links?: Record<
    string,
    {
      title: string;
      description: string;
      websiteLink: string;
    }
  >;
  laws?: Record<
    string,
    {
      title: string;
      description: string;
      content: string;
      category: string;
    }
  >;
  documents?: Record<
    string,
    {
      title: string;
      description: string;
      fileUrl: string;
      category: string;
    }
  >;
  media?: Record<
    string,
    {
      title: string;
      description: string;
      fileUrl: string;
      type: string;
    }
  >;
  news?: Record<
    string,
    {
      title: string;
      content: string;
      imageUrl: string;
      category: string;
      date: string;
    }
  >;
}

export interface LawItem {
  // Define the structure of the law item object
}

interface Setting {
  key: string;
  value: string;
}

export class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://192.168.88.93:8000",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Initialize token from localStorage
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
      if (this.token) {
        this.setToken(this.token);
      }
    }

    // Add request interceptor to add token
    this.instance.interceptors.request.use((config) => {
      // Skip adding Authorization header for public endpoints
      const isPublicEndpoint = [
        "/api/login",
        "/api/register",
        "/api/posts",
        "/api/menus",
        "/api/footer",
        "/api/advertisements",
        "/api/ad-categories",
        "/api/transparency",
        "/api/reports/notifications",
        "/api/notifications",
        "/api/banners",
      ].some((endpoint) => config.url?.includes(endpoint));

      if (isPublicEndpoint) {
        // Explicitly remove Authorization header for public endpoints
        delete config.headers.Authorization;
        return config;
      }

      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Only clear token on 401 if it's not a public endpoint
        const isPublicEndpoint = [
          "/api/login",
          "/api/register",
          "/api/posts",
          "/api/menus",
          "/api/footer",
          "/api/advertisements",
          "/api/ad-categories",
          "/api/transparency",
          "/api/reports/notifications",
          "/api/notifications",
          "/api/banners",
        ].some((endpoint) => error.config?.url?.includes(endpoint));

        if (error.response?.status === 401 && !isPublicEndpoint) {
          this.clearToken();
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    // Handle network errors
    if (!error.response) {
      console.error("Network error details:", error.message);
      if (error.code === "ECONNREFUSED") {
        return new ApiError(
          "Backend server is not running. Please start the backend server."
        );
      }
      if (error.message.includes("Cannot read properties of undefined")) {
        return new ApiError(
          "Network error: Unable to connect to the server. Please check your internet connection and try again."
        );
      }
      return new ApiError(`Network error: ${error.message}`);
    }

    const errorData = error.response.data as ErrorResponse;
    // Only log error details if they exist
    if (errorData.message || errorData.code || errorData.details) {
      console.error("API error details:", {
        status: error.response.status,
        message: errorData.message,
        code: errorData.code,
        details: errorData.details,
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
        // Only clear token on 401 errors
        this.clearToken();
        return new ApiError(
          errorData.message || "Unauthorized: Please log in again",
          error.response.status,
          errorData.code,
          errorData.details
        );
      case 403:
        // Don't clear token on 403 errors, just return the error
        return new ApiError(
          errorData.message ||
            "Forbidden: You don't have permission to perform this action",
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
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  clearToken() {
    this.setToken(null);
    localStorage.removeItem("token");
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("Attempting login with:", { email });
      const response = await this.instance.post<LoginResponse>(
        endpoints.auth.login,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          validateStatus: (status) => status < 500, // Accept all status codes less than 500
        }
      );

      console.log("Login response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.status === 401) {
        const errorMessage = response.data?.error || "Invalid credentials";
        console.error("Login failed:", errorMessage);
        throw new Error(errorMessage);
      }

      if (!response.data || !response.data.token) {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format from server");
      }

      this.setToken(response.data.token);
      return {
        token: response.data.token,
        message: response.data.message,
        user: response.data.user,
      };
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          },
        });

        const errorMessage = error.response?.data?.error || "Login failed";
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async adminLogin(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("Attempting admin login with:", { email });
      const response = await this.instance.post<LoginResponse>(
        endpoints.auth.admin.login,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          validateStatus: (status) => status < 500,
        }
      );

      console.log("Admin login response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.status === 401) {
        const errorMessage =
          response.data?.error || "Invalid admin credentials";
        console.error("Admin login failed:", errorMessage);
        throw new Error(errorMessage);
      }

      if (!response.data || !response.data.token) {
        console.error("Invalid admin response format:", response.data);
        throw new Error("Invalid response format from server");
      }

      // Get user profile after successful login
      this.setToken(response.data.token);
      const user = await this.getProfile();
      console.log("Got user profile:", user);

      return {
        token: response.data.token,
        message: response.data.message,
        user: user,
      };
    } catch (error) {
      console.error("Admin login error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          },
        });

        const errorMessage =
          error.response?.data?.error || "Admin login failed";
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
    return response.data.data;
  }

  async logout(): Promise<void> {
    try {
      await this.instance.post(endpoints.auth.logout);
    } finally {
      this.clearToken();
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await this.instance.get<User>("/api/admin/profile");
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await this.instance.put<User>(
        "/api/admin/profile",
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Post methods
  async listPosts(): Promise<Post[]> {
    const response = await this.instance.get<{ data: Post[] }>("/api/posts");
    return response.data.data;
  }

  async getPost(id: string): Promise<Post> {
    const response = await this.instance.get<{ data: Post }>(
      endpoints.posts.get(id)
    );
    return response.data.data;
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    const response = await this.instance.post<{ data: Post }>(
      "/api/posts",
      data
    );
    return response.data.data;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const response = await this.instance.put<{ data: Post }>(
      `/api/posts/${id}`,
      data
    );
    return response.data.data;
  }

  async deletePost(id: string): Promise<void> {
    await this.instance.delete(`/api/posts/${id}`);
  }

  // Menu methods
  async listMenus(): Promise<Menu[]> {
    const response = await this.instance.get<{ data: Menu[] }>(
      endpoints.menus.list
    );
    return response.data.data;
  }

  // Settings methods
  async getSettings(): Promise<Setting[]> {
    const response = await this.instance.get<Setting[]>("/api/settings");
    return response.data;
  }

  async updateSettings(settings: Setting[]): Promise<void> {
    try {
      if (!this.token) {
        throw new ApiError("Not authenticated. Please log in again.");
      }

      // Convert array of settings to a single object with key-value pairs
      const settingsData = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);

      const response = await this.instance.put<void>(
        "/api/settings",
        settingsData,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        this.clearToken();
        throw new ApiError("Session expired. Please log in again.");
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw this.handleError(error as AxiosError);
    }
  }

  // Footer methods
  async getFooter(): Promise<Footer> {
    try {
      const response = await this.instance.get<{ data: FooterSection[] }>(
        "/footer",
        {
          headers: {
            Authorization: undefined,
          },
        }
      );

      // Handle both response formats: { data: FooterSection[] } and FooterSection[] directly
      const sections =
        response.data && "data" in response.data
          ? response.data.data
          : response.data;

      // Return default footer data if no data is received
      if (!sections || !Array.isArray(sections)) {
        console.warn(
          "No footer sections received from server, using default values"
        );
        return {
          sections: [],
        };
      }

      return {
        sections: sections.map((section) => ({
          id: section.id,
          title: section.title,
          mapImage: section.mapImage || null,
          address: section.address || "",
          phone: section.phone || "",
          email: section.email || "",
          socialLinks: section.socialLinks || [],
          copyright: section.copyright || "",
          links: section.links || [],
        })),
      };
    } catch (error) {
      console.warn("Footer fetch failed, using default values:", error);
      return {
        sections: [],
      };
    }
  }

  async createFooterSection(data: FooterCreateRequest): Promise<FooterSection> {
    try {
      const response = await this.instance.post<{ data: FooterSection }>(
        "/footer",
        data
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to create footer section:", error);
      throw this.handleError(error as AxiosError);
    }
  }

  async updateFooterSection(
    id: string,
    data: FooterUpdateRequest
  ): Promise<FooterSection> {
    try {
      const response = await this.instance.put<{ data: FooterSection }>(
        `/footer/${id}`,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to update footer section:", error);
      throw this.handleError(error as AxiosError);
    }
  }

  async deleteFooterSection(id: string): Promise<void> {
    try {
      await this.instance.delete(`/footer/${id}`);
    } catch (error) {
      console.error("Failed to delete footer section:", error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Advertisement methods
  async listAdvertisements(): Promise<Advertisement[]> {
    const response = await this.instance.get<{ data: Advertisement[] }>(
      endpoints.advertisements.list
    );
    return response.data.data;
  }

  async createAdvertisement(
    data: AdvertisementCreateRequest
  ): Promise<Advertisement> {
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

  async updateAdvertisement(
    id: string,
    data: AdvertisementUpdateRequest
  ): Promise<Advertisement> {
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
      if (!this.token) {
        return false;
      }

      const response = await this.instance.get("/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // User management methods
  async getUsers(): Promise<User[]> {
    try {
      if (!this.token) {
        throw new ApiError("Not authenticated. Please log in again.");
      }

      const response = await this.instance.get<{ data: User[] }>(
        endpoints.auth.admin.users,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (response.status === 401) {
        this.clearToken();
        throw new ApiError("Session expired. Please log in again.");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw this.handleError(error as AxiosError);
    }
  }

  async approveUser(userId: string): Promise<User> {
    const response = await this.instance.patch<User>(
      `/api/users/${userId}/approve`
    );
    return response.data;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.instance.delete(`/api/users/${userId}`);
  }

  async updateUserStatus(
    userId: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    try {
      await this.instance.patch(`/api/admin/users/${userId}/status`, {
        status,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access");
        }
        throw new Error(
          error.response?.data?.message || "Failed to update user status"
        );
      }
      throw new Error("Network error");
    }
  }

  async updateUserPremiumStatus(
    userId: string,
    isPremium: boolean
  ): Promise<User> {
    const response = await this.instance.patch<{ data: User }>(
      `/api/users/${userId}/premium`,
      { isPremium }
    );
    return response.data.data;
  }

  // Notification methods
  async getNotifications(): Promise<Notification[]> {
    const response = await this.instance.get<{ data: Notification[] }>(
      endpoints.notifications.list
    );
    return response.data.data;
  }

  async getUnreadNotificationCount(): Promise<number> {
    const response = await this.instance.get<{ data: { count: number } }>(
      endpoints.notifications.unreadCount
    );
    return response.data.data.count;
  }

  async markNotificationRead(id: string): Promise<void> {
    await this.instance.put(endpoints.notifications.markRead(id));
  }

  async deleteNotification(id: string): Promise<void> {
    await this.instance.delete(endpoints.notifications.delete(id));
  }

  // File upload methods
  async uploadFile(file: File): Promise<string> {
    try {
      if (!this.token) {
        throw new ApiError("Not authenticated. Please log in again.");
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await this.instance.post(
        endpoints.upload.file,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (response.status === 401) {
        this.clearToken();
        throw new ApiError("Session expired. Please log in again.");
      }

      // Handle different response formats
      if (response.data && response.data.url) {
        return response.data.url;
      } else if (
        response.data &&
        response.data.data &&
        response.data.data.url
      ) {
        return response.data.data.url;
      } else if (response.data && typeof response.data === "string") {
        return response.data;
      }

      console.error("Unexpected upload response format:", response.data);
      throw new ApiError("Unexpected response format from server");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw this.handleError(error as AxiosError);
    }
  }

  // Banner methods
  async getBanners(): Promise<any[]> {
    const response = await this.instance.get<{ data: any[] }>("/api/banners", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data.data;
  }

  async createBanner(data: any): Promise<void> {
    await this.instance.post("/banners", data);
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
