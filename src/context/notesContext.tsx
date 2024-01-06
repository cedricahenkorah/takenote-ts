import { Dispatch, createContext, useReducer, ReactElement } from "react";

interface Note {
  _id: string;
  title: string;
  label: string;
  body: string;
  user_id: string;
}

interface NotesState {
  notes: Note[] | null | undefined;
}

const initialState: NotesState = {
  notes: null,
};

interface NotesAction {
  type: string;
  payload?: Note | null;
}

export interface NotesContextProps {
  state: NotesState;
  dispatch: Dispatch<NotesAction>;
}

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const NotesContext = createContext<NotesContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const notesReducer = (
  state: NotesState,
  action: NotesAction
): NotesState => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload as unknown as Note[],
      };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: action.payload
          ? [action.payload as Note, ...(state.notes || [])]
          : state.notes,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes:
          state.notes?.filter((n) => n._id !== action.payload?._id) || null,
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
