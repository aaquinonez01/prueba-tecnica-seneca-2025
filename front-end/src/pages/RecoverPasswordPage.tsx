import { RecoverPasswordForm } from "../components/RecoverPasswordForm";
import { useAuthStore } from "../store/auth";

const RecoverPasswordPage: React.FC = () => {
  const success = useAuthStore((state) => state.success);
  const error = useAuthStore((state) => state.error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <a
              href="/auth/login"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ir a Iniciar Sesión
            </a>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{success}</span>
            <a
              href="/auth/login"
              className="mt-4 inline-block text-green-700 underline rounded "
            >
              Ir a Iniciar Sesión
            </a>
          </div>
        )}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Recuperar Contraseña
        </h2>
        <p className="text-center text-gray-600">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>
        <RecoverPasswordForm />
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
