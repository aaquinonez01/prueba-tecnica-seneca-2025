import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
import { useSearchParams } from "react-router-dom";

export const ResetPasswordForm: React.FC = () => {
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (token) {
      resetPassword(token, data.password);
    } else {
      alert("Token no válido");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 grid grid-cols-1 gap-4"
    >
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Nueva Contraseña
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true, minLength: 6 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.password?.type === "required" &&
            "La contraseña es requerida."}
          {errors.password?.type === "minLength" &&
            "La contraseña debe tener al menos 6 caracteres."}
        </span>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true, minLength: 6 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.confirmPassword?.type === "required" &&
            "La confirmación es requerida."}
          {errors.confirmPassword?.type === "minLength" &&
            "La confirmación debe tener al menos 6 caracteres."}
        </span>
      </div>
      <button
        id="resetPasswordButton"
        disabled={isLoading}
        type="submit"
        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        {isLoading ? "Cargando..." : "Cambiar Contraseña"}
      </button>
    </form>
  );
};
