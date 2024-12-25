import dotenv from "dotenv";
dotenv.config();
const {
  PORT,
  NODE_ENV,
  BASE_SITE,
  DB_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CN_CLOUD_NAME,
  CN_API_KEY,
  CN_SECRET,
  ADMIN_PASSWORD,
} = process.env;

export const config = {
  PORT: PORT || 5000,
  NODE_ENV: NODE_ENV || "development",
  DB_URL: DB_URL,
  BASE_SITE: BASE_SITE,
  ACCESS_TOKEN: {
    SECRET: ACCESS_TOKEN_SECRET,
    EXPIRES_IN: "1h", // 1h
  },
  REFRESH_TOKEN: {
    SECRET: REFRESH_TOKEN_SECRET,
    // EXPIRES_IN: 60 * 60 * 24 * 30, // 30d
    EXPIRES_IN: "30d",
  },
  ADMIN_PASSWORD: ADMIN_PASSWORD,
  cloudinary: {
    cloud_name: CN_CLOUD_NAME,
    api_key: CN_API_KEY,
    api_secret: CN_SECRET,
  },
};
