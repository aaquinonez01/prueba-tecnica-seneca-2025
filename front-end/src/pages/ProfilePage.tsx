import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useAuthStore } from "../store/auth";

const ProfilePage: React.FC = () => {
  const success = useAuthStore((state) => state.success);
  const error = useAuthStore((state) => state.error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Actualizar Perfil
        </h2>
        <UpdateProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
