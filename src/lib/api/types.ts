export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  pharmacyName?: string;
  pharmacyRegisterNumber?: string;
  pharmacyAddress?: string;
  phoneNumber?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: string;
  title: string;
  url: string;
  order: number;
  submenus?: Menu[];
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Footer {
  sections: {
    title: string;
    links: {
      text: string;
      url: string;
    }[];
  }[];
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  category: AdCategory;
  price: number;
  images: string[];
  status: "pending" | "approved" | "rejected";
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface AdCategory {
  id: string;
  name: string;
  description?: string;
}

export interface AdvertisementCreateRequest {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  images: string[];
}

export interface AdvertisementUpdateRequest {
  title?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  images?: string[];
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

export interface LoginResponse {
  message: string;
  token: string;
  user?: User;
  error?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  code?: string;
  details?: string[];
}

export interface Content {
  hero?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string | null;
    description?: string;
    image?: string | null;
    pdf?: string | null;
    link?: string | null;
    youtube?: string | null;
  };
  landing?: {
    backgroundImage?: string | null;
  };
  // Add other sections as needed
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: string[]
  ) {
    super(message);
    // Set the prototype explicitly
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
  }
} 