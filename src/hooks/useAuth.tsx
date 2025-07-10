import { useAuth as useAuthService } from "../services/auth-service";

// Re-export the auth service hook
export function useAuth() {
  return useAuthService();
}
