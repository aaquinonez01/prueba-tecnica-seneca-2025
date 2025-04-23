import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
import { UserUpdateData } from "../types/UserData";

export const UpdateProfileForm: React.FC = () => {
  const updateUser = useAuthStore((state) => state.updateProfileUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      address: user?.address || "",
      birthDate: user?.birthDate || "",
    },
  });

  const onSubmit = (data: UserUpdateData) => {
    updateUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 grid grid-cols-2 gap-4"
    >
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Nombres
        </label>
        <input
          type="text"
          id="firstName"
          {...register("firstName", { required: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.firstName?.type === "required" && "El nombre es requerido."}
        </span>
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Apellidos
        </label>
        <input
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.lastName?.type === "required" && "El apellido es requerido."}
        </span>
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Dirección
        </label>
        <input
          type="text"
          id="address"
          {...register("address", { required: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.address?.type === "required" && "La dirección es requerida."}
        </span>
      </div>
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="birthDate"
          {...register("birthDate", { required: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.birthDate?.type === "required" &&
            "La fecha de nacimiento es requerida."}
        </span>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Correo Electrónico
        </label>
        <input
          disabled
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
        id="updateProfileButton"
        disabled={isLoading}
        type="submit"
        className="w-full justify-center col-span-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        {isLoading ? "Cargando..." : "Actualizar Perfil"}
      </button>
    </form>
  );
};
