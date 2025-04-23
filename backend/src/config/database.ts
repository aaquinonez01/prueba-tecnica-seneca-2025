import { PrismaClient } from "@prisma/client";
import { envConfig } from "./envConfig";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envConfig.DATABASE_URL,
    },
  },
});

// Función para conectar a la base de datos
export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Base de Datos conectada correctamente");
  } catch (error) {
    console.error("Error al intentar conectar la Base de Datos: ", error);
    process.exit(1);
  }
};

// Función para desconectar de la base de datos
export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
  console.log("Base de Datos desconectada correctamente");
};

export default prisma;
