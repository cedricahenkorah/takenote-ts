import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

interface ErrorResponse {
  error: string;
}

interface SignupResponse {
  username: string;
  email: string;
  token: string;
}

interface useSignupResult {
  signup: (username: string, email: string, password: string) => Promise<void>;
  isLoading: boolean | null;
  error: string | null;
}

export const useSignup = (): useSignupResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const { dispatch } = useAuthContext();

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://takenote-server.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (!response.ok) {
      const json: ErrorResponse = await response.json();
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const json: SignupResponse = await response.json();

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
