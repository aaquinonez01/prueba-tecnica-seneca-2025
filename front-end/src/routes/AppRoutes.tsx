import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivateAccountPage from "../pages/ActivateAccountPage";
import { useAuth } from "../hooks/useAuth";
import { MainLayout } from "../layout/MainLayout";
import { HomePage } from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const AppRoutes = () => {
  const { authStatus } = useAuth();

  if (authStatus === "checking") {
    return <LoadingSpinner />;
  }

  if (authStatus === "authenticated") {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/activate/:token" element={<h1>Activate</h1>} />
      <Route path="/auth/forgot-password" element={<RecoverPasswordPage />} />
      <Route path="/activate" element={<ActivateAccountPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
