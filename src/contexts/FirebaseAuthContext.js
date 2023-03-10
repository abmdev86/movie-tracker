import { createContext, useReducer } from "react";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

const initialUser = {
  id: 0,
  name: "",
  token: "",
};
function userReducer(user, action) {
  switch (action.type) {
    case "login": {
      return { ...user, id: action.id, name: action.name, token: action.token };
    }

    default: {
      throw Error(`Unkown action: ${action.type}`);
    }
  }
}

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer({
    userReducer,
    initialUser,
  });

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
