export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apis = {
  dashboard: {
    get: `${BASE_URL}/api/v1/dashboard`,
    status: `${BASE_URL}/api/v1/dashboard/status-count`,
  },
  roles: {
    create: `${BASE_URL}/api/v1/role/create`,
    get: `${BASE_URL}/api/v1/role`,
    update: `${BASE_URL}/api/v1/role`,
    delete: `${BASE_URL}/api/v1/role`,
  },

  banners: {
    create: `${BASE_URL}/api/v1/banner/create`,
    get: `${BASE_URL}/api/v1/banner`,
    update: `${BASE_URL}/api/v1/banner`,
    delete: `${BASE_URL}/api/v1/banner`,
  },

  guests: {
    create: `${BASE_URL}/api/v1/guest/create`,
    get: `${BASE_URL}/api/v1/guest`,
    update: `${BASE_URL}/api/v1/guest`,
    delete: `${BASE_URL}/api/v1/guest`,
  },

  episodes: {
    create: `${BASE_URL}/api/v1/episode/create`,
    get: `${BASE_URL}/api/v1/episode`,
    update: `${BASE_URL}/api/v1/episode`,
    delete: `${BASE_URL}/api/v1/episode`,
  },
  event: {
    create: `${BASE_URL}/api/v1/events/create`,
    get: `${BASE_URL}/api/v1/events`,
    update: `${BASE_URL}/api/v1/events`,
    delete: `${BASE_URL}/api/v1/events`,
  },

  quickLink: {
    create: `${BASE_URL}/api/v1/quick-link/create`,
    get: `${BASE_URL}/api/v1/quick-link`,
    update: `${BASE_URL}/api/v1/quick-link`,
    delete: `${BASE_URL}/api/v1/quick-link`,
  },

  auth: {
    login: `${BASE_URL}/api/v1/auth/login`,
    loggedIn: `${BASE_URL}/api/v1/auth/loggedIn`,
  },
};

export default apis;
