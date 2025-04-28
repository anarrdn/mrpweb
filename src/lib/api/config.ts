export const apiConfig = {
  backendUrl: "http://192.168.88.93:8000",
  apiVersion: "v1",
  timeout: 10000, // 10 seconds
  authTokenKey: "auth_token",
};

export const endpoints = {
  auth: {
    login: "/login",
    register: "/register",
    profile: "/profile",
    logout: "/logout",
    admin: {
      login: "/admin/login",
      register: "/admin/register",
      profile: "/admin/profile",
      logout: "/admin/logout",
    },
  },
  users: {
    profile: "/profile",
    updateProfile: "/profile",
  },
  posts: {
    list: "/posts",
    get: (id: string) => `/posts/${id}`,
  },
  menus: {
    list: "/menus",
  },
  settings: {
    get: "/settings",
  },
  footer: {
    get: "/footer",
  },
  content: {
    get: "/content",
    update: "/content",
    updateLaw: (lawId: string) => `/content/laws/${lawId}`,
  },
  advertisements: {
    list: "/advertisements",
    create: "/advertisements",
    my: "/advertisements/my",
    update: (id: string) => `/advertisements/my/${id}`,
    delete: (id: string) => `/advertisements/my/${id}`,
  },
  adCategories: {
    list: "/ad-categories",
  },
  notifications: {
    list: "/api/notifications",
    create: "/api/notifications",
    unreadCount: "/api/notifications/unread/count",
    delete: (id: string) => `/api/notifications/${id}`,
    markRead: (id: string) => `/api/notifications/${id}/read`,
  },
};
