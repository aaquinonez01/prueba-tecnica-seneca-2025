import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";

export const RecoverPasswordForm: React.FC = () => {
  const sendRecoveryEmail = useAuthStore((state) => state.forgotPassword);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string }) => {
    sendRecoveryEmail(data.email);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 grid grid-cols-1 gap-4"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.email?.type === "required" && "El correo es requerido."}
          {errors.email?.type === "pattern" && "El correo no es válido."}
        </span>
      </div>
      <button
        id="recoverPasswordButton"
        disabled={isLoading}
        type="submit"
        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        {isLoading ? "Cargando..." : "Enviar Correo de Recuperación"}
      </button>
    </form>
  );
};
