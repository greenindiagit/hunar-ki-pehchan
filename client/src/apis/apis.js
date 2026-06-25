export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apis = {
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
};

export default apis;
