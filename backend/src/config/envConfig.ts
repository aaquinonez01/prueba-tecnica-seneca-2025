import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Configuración de entorno
export const envConfig = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "secret_key_for_development",
  JWT_EXPIRES_IN: 60 * 60, // 1 week in seconds

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,

  // App URLs
  APP_URL: process.env.APP_URL || "http://localhost:3000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  // Usuario por defecto
  DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL || "admin@example.com",
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD || "Admin123!",
};

export default envConfig;
