export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  isAdmin: boolean;
  pharmacyName?: string;
  phoneNumber?: string;
  address?: string;
  isApproved?: boolean;
  paymentProof?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pharmacyRegisterNumber?: string;
  pharmacyAddress?: string;
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

export interface FooterSection {
  id: string;
  title: string;
  mapImage?: string | null;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  copyright?: string;
  links?: {
    text: string;
    url: string;
  }[];
}

export interface Footer {
  sections: FooterSection[];
}

export interface FooterCreateRequest {
  title: string;
  mapImage?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  copyright?: string;
  links?: {
    text: string;
    url: string;
  }[];
}

export interface FooterUpdateRequest {
  title?: string;
  mapImage?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  copyright?: string;
  links?: {
    text: string;
    url: string;
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
  pharmacy_name: string;
  pharmacy_register_number: string;
  pharmacy_address: string;
  phone_number: number;
  payment_proof: string;
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

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
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
    this.name = "ApiError";
  }
}
