const API_CONFIGS = {
  production: {
    API_BASE_URL: "https://plantech-administration.onrender.com",
  },
  development: {
    API_BASE_URL: "http://localhost:4000",
  },
};
const environment = "development";
const config = API_CONFIGS[environment];

export default config;
