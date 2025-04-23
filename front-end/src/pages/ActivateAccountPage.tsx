import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

const ActivateAccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const activateAccount = useAuthStore((state) => state.activateAccount);
  const error = useAuthStore((state) => state.error);
  const success = useAuthStore((state) => state.success);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (token) {
      activateAccount(token);
    }
  }, [token, activateAccount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md text-center">
        {isLoading && (
          <h2 className="text-2xl font-bold text-gray-700">
            Activando tu cuenta...
          </h2>
        )}
        {success !== null && (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              ¡Cuenta activada exitosamente!
            </h2>
            <p className="text-gray-600 mt-4">
              Ya puedes iniciar sesión en tu cuenta.
            </p>
            <a
              href="/auth/login"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ir a Iniciar Sesión
            </a>
            <p className="text-gray-600 mt-4">
              Si no has recibido el correo de activación, revisa tu carpeta de
              spam o vuelve a solicitarlo.
            </p>
            <a
              href="/auth/resend-activation"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reenviar correo de activación
            </a>
          </>
        )}
        {error !== null && (
          <>
            <h2 className="text-2xl font-bold text-red-600">
              Error al activar la cuenta
            </h2>
            <p className="text-gray-600 mt-4">
              Por favor, verifica el enlace o intenta nuevamente.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccountPage;
