import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
export const MainLayout: React.FC = () => {
  const signOut = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const logout = () => {
    signOut();
  };
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Prueba Tecnica Seneca</h1>
          <h3>
            {/* Ultimo inicio de sesion */}
            {user?.lastLogin
              ? `Ultimo inicio de sesion: ${new Date(
                  user.lastLogin
                ).toLocaleString("es-ES")}`
              : "No hay registros de inicio de sesión"}
          </h3>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline hover:text-gray-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:underline hover:text-gray-200"
              >
                Perfil
              </Link>
            </li>
            <li>
              <button
                className="hover:underline hover:text-gray-200 cursor-pointer"
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-grow container mx-auto py-8 px-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
