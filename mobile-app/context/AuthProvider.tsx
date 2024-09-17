import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser } from "@/lib/appwrite";
import React from "react";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const { login, logout, setChecking, auth } = useAuth();
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      setChecking(true);
      try {
        const user = await getCurrentUser();
        if (user) {
          login(user);
          return;
        }
        logout();
      } catch (error) {
        console.error(error);
      } finally {
        setChecking(false);
      }
    };
    checkAuthStatus();
  }, []);
  return <>{children}</>;
}
