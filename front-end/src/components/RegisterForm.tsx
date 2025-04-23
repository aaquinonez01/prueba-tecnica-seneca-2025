import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
export const RegisterForm: React.FC = () => {
  const registerUser = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (
    data:
      | {
          firstName: string;
          lastName: string;
          address: string;
          birthDate: string;
          email: string;
          password: string;
        }
      | any
  ) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      birthDate: data.birthDate,
      email: data.email,
      password: data.password,
    };
    registerUser(userData);
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
          {...register("firstName", { required: true, minLength: 2 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.firstName?.type === "required" && "El nombre es requerido."}
          {errors.firstName?.type === "minLength" &&
            "El nombre debe tener al menos 2 caracteres."}
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
          {...register("lastName", { required: true, minLength: 2 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.lastName?.type === "required" && "El apellido es requerido."}
          {errors.lastName?.type === "minLength" &&
            "El apellido debe tener al menos 2 caracteres."}
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
          {...register("address", { required: true, minLength: 5 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo
-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.address?.type === "required" && "La dirección es requerida."}
          {errors.address?.type === "minLength" &&
            "La dirección debe tener al menos 5 caracteres."}
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo
-500 sm:text
-sm"
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
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: true,
            minLength: 6,
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message:
                "La contraseña debe tener al menos 6 caracteres y contener letras y números.",
            },
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span className="text-red-500 text-sm">
          {errors.password?.type === "required" &&
            "La contraseña es requerida."}
          {errors.password?.type === "minLength" &&
            "La contraseña debe tener al menos 6 caracteres."}
          {errors.password?.type === "pattern" &&
            "La contraseña debe contener letras y números."}
        </span>
      </div>
      <button
        id="registerButton"
        disabled={isLoading}
        type="submit"
        className="w-full col-span-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        {isLoading ? "Cargando..." : "Registrar"}
      </button>
    </form>
  );
};
