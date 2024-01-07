import {
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  Dispatch,
} from "react";

interface AuthState {
  username?: string;
  user: { token: string; username: string } | object | null | undefined;
}

interface AuthAction {
  type: string;
  payload?: object;
}

export interface AuthContextProps {
  user: AuthState;
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
  user: {},
};

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const AuthContext = createContext<AuthContextProps | undefined>({
  user: initialState,
  dispatch: () => {},
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT": {
      return { user: null };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
