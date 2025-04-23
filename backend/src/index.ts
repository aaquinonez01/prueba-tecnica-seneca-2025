// src/index.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Routes } from "./routes/index";
import { ErrorMiddleware } from "./middleware/error.middleware";
import { envConfig } from "./config/envConfig";
import { connectDatabase } from "./config/database";

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Conexión a la base de datos
connectDatabase()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  });

// Ruta de salud para verificar que el servidor está funcionando
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Servidor funcionando correctamente" });
});

// Registrar todas las rutas de la API
app.use("/api", Routes.initialize());

// Ruta para manejar rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
  });
});

// Middleware de manejo de errores (debe ser el último middleware)
app.use(ErrorMiddleware.handle);

// Iniciar servidor
const PORT = envConfig.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
