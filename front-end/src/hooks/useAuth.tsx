import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
export const useAuth = () => {
  const authStatus = useAuthStore((state) => state.authStatus);

  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    authStatus,
  };
};
