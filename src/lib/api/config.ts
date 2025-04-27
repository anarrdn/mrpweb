export const config = {
  backendUrl: "http://localhost:8000",
  apiVersion: "v1",
  timeout: 10000, // 10 seconds
  authTokenKey: "auth_token",
};

export const endpoints = {
  auth: {
    login: "/api/login",
    register: "/api/register",
    profile: "/api/profile",
    logout: "/api/logout",
    admin: {
      login: "/api/admin/login",
      register: "/api/admin/register",
      profile: "/api/admin/profile",
      logout: "/api/admin/logout",
    }
  },
  users: {
    profile: "/api/users/profile",
    updateProfile: "/api/users/profile",
  },
  posts: {
    list: "/api/posts",
    get: (id: string) => `/api/posts/${id}`,
  },
  menus: {
    list: "/api/menus",
  },
  settings: {
    get: "/api/settings",
  },
  footer: {
    get: "/api/footer",
  },
  content: {
    get: "/api/content",
    update: "/api/content",
    updateLaw: (lawId: string) => `/api/content/laws/${lawId}`,
  },
  advertisements: {
    list: "/api/advertisements",
    create: "/api/advertisements",
    my: "/api/advertisements/my",
    update: (id: string) => `/api/advertisements/my/${id}`,
    delete: (id: string) => `/api/advertisements/my/${id}`,
  },
  adCategories: {
    list: "/api/ad-categories",
  },
}; 