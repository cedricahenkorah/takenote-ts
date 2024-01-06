import { useAuthContext } from "./useAuthContext";
import { useNotesContext } from "./useNotesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: notesDispatch } = useNotesContext();

  const logout = (): void => {
    // remove user from local storage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "LOGOUT" });

    // clear global notes state
    notesDispatch({ type: "SET_NOTES", payload: null });
  };

  return { logout };
};
