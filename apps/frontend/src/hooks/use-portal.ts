import { useMutation } from "@tanstack/react-query";

interface SessionLoginResponse {
  success: boolean;
  error?: string;
}

interface ValidateLicenseResponse {
  success: boolean;
  error?: string;
}

export function useSessionLogin() {
  return useMutation({
    mutationFn: async (token: string): Promise<SessionLoginResponse> => {
      const res = await fetch("/api/portal/session-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed");
      return data;
    },
  });
}

export function useValidateLicense() {
  return useMutation({
    mutationFn: async (key: string): Promise<ValidateLicenseResponse> => {
      const res = await fetch("/api/portal/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Validation failed");
      return data;
    },
  });
}
