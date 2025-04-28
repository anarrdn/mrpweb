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

export class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: apiConfig.backendUrl,
      timeout: apiConfig.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Add request interceptor to add token
    this.instance.interceptors.request.use((config) => {
      // Skip adding Authorization header for public endpoints
      const isPublicEndpoint = [
        "/api/login",
        "/api/register",
        "/api/posts",
        "/api/menus",
        "/api/settings",
        "/api/footer",
        "/api/advertisements",
        "/api/ad-categories",
        "/api/transparency",
        "/api/reports/notifications",
        "/api/notifications",
        "/api/upload",
      ].some((endpoint) => config.url?.includes(endpoint));

      if (isPublicEndpoint) {
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
          "/api/settings",
          "/api/footer",
          "/api/advertisements",
          "/api/ad-categories",
          "/api/transparency",
          "/api/reports/notifications",
          "/api/notifications",
          "/api/upload",
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
  }

  clearToken() {
    this.setToken(null);
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
      const response = await this.instance.get<User>("/api/profile");
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await this.instance.put<User>("/api/profile", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Content methods
  async getContent(): Promise<Content> {
    const response = await this.instance.get<{ data: Content }>("/api/content");
    return response.data.data;
  }

  async updateContent(section: string, data: any): Promise<void> {
    await this.instance.put(`/api/content/${section}`, data);
  }

  async deleteContent(section: string, id: string): Promise<void> {
    await this.instance.delete(`/api/content/${section}/${id}`);
  }

  async updateLawContent(
    lawId: string,
    data: Partial<LawItem>
  ): Promise<Content> {
    const response = await this.instance.put<{ data: Content }>(
      endpoints.content.updateLaw(lawId),
      data
    );
    return response.data.data;
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
  async getSettings(): Promise<Settings> {
    const response = await this.instance.get<{ data: Settings }>(
      endpoints.settings.get
    );
    return response.data.data;
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

      const response = await this.instance.get("/api/profile", {
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
    const response = await this.instance.get<{ data: User[] }>("/api/users");
    return response.data.data;
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

  async updateUserStatus(userId: string, isApproved: boolean): Promise<User> {
    const response = await this.instance.patch<{ data: User }>(
      `/api/users/${userId}/status`,
      { isApproved }
    );
    return response.data.data;
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
    const formData = new FormData();
    formData.append("file", file);
    const response = await this.instance.post<{ data: { url: string } }>(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data.url;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
