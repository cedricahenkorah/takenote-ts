import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

interface ErrorResponse {
  error: string;
}

interface LoginResponse {
  username: string;
  email: string;
  token: string;
}

interface useLoginResult {
  login: (username: string, password: string) => Promise<void>;
  isLoading: boolean | null;
  error: string | null;
}

export const useLogin = (): useLoginResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://takenote-server.onrender.com/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      const json: ErrorResponse = await response.json();

      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const json: LoginResponse = await response.json();

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
