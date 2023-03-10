import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";
export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

const initialUser = {
  id: 0,
  name: "",
  token: "",
};
function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      let user = {};

      console.log("given user", action);
      user = {
        id: action.newId,
        name: action.newName,
        token: action.newToken,
      };
      return user;
    }

    default: {
      throw Error(`Unkown action: ${action.type}`);
    }
  }
}

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("signing in", user.auth.currentUser.email);
        dispatch({
          newName: user.auth.currentUser.email,
          newId: user.auth.currentUser.uid,
          newToken: user.auth.currentUser.accessToken,
          type: "login",
        });
      } else {
        console.log("user logged out");
      }
    });
  }, []);
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
