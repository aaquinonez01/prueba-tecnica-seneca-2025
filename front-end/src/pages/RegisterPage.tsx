import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { RegisterForm } from "../components/RegisterForm";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const registerUserError = useAuthStore((state) => state.error);
  const registerUserSuccess = useAuthStore((state) => state.success);
  return (
    <AuthLayout>
      {registerUserError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{registerUserError}</span>
        </div>
      )}
      {registerUserSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Éxito: </strong>
          <span className="block sm:inline">{registerUserSuccess}</span>
          <Link
            to="/auth/login"
            className="text-blue-500 hover:text-blue-700 underline ml-2"
          >
            Regresar al Inicio de Sesión
          </Link>
        </div>
      )}
      <h1 className="text-2xl font-bold text-center mb-4">
        Registro de Usuario
      </h1>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
