import { useContext } from "react";
import { NotesContext, NotesContextProps } from "../context/notesContext";

export const useNotesContext = (): NotesContextProps => {
  const context = useContext<NotesContextProps>(NotesContext);

  if (!context) {
    throw Error("useNotesContext must be used inside the NotesContextProvider");
  }

  return context;
};
