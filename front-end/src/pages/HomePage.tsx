import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6">
        Bienvenido a tu Dashboard
      </h1>
      <p className="text-xl mb-8">
        Gestiona tu perfil y explora las funcionalidades.
      </p>
      {user && (
        <div className="mt-4 p-6 bg-white text-gray-800 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold mb-4">
            Información del Usuario
          </h2>
          <p className="text-lg mb-2">
            Nombre: {user.firstName} {user.lastName}
          </p>
          <p className="text-lg mb-4">Correo: {user.email}</p>
          <button
            onClick={handleUpdateProfile}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 cursor-pointer"
          >
            Actualizar Perfil
          </button>
        </div>
      )}
    </div>
  );
};
