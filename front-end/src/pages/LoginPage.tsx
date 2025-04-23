import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuthStore } from "../store/auth";

const LoginPage: React.FC = () => {
  const loginUserError = useAuthStore((state) => state.error);
  const loginUserSuccess = useAuthStore((state) => state.success);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        {loginUserError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{loginUserError}</span>
          </div>
        )}
        {loginUserSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{loginUserSuccess}</span>
          </div>
        )}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <LoginForm />
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Regístrate aquí
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Olvidaste tu contraseña?{" "}
          <Link
            to="/auth/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Recupera tu contraseña
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
