import { AuthContext, AuthContextProps } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = (): AuthContextProps => {
  const context = useContext<AuthContextProps | undefined>(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside a AuthContextProvider");
  }

  return context;
};
