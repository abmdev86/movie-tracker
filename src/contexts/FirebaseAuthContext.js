import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";
export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

const initialUser = {
  id: null,
  name: "Guest",
  token: "",
  displayName: "Guest",
  isVerified: false,
  photoUrl: "",
  online: false,
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
        displayName: action.newDisplayName,
        isVerified: action.newIsVerified,
        photoUrl: action.newPhotoUrl,
        online: true,
      };

      return user;
    }
    case "logout": {
      console.log(`${state.name} is logging out!`);

      return {
        id: null,
        name: "Guest",
        token: null,
        displayName: "Guest",
        isVerified: false,
        photoUrl: "",
        online: false,
      };
    }

    default: {
      throw Error(`Unkown action: ${action.type}`);
    }
  }
}

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUser);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("signing in", user.auth);
        dispatch({
          newName: user.auth.currentUser.email,
          newId: user.auth.currentUser.uid,
          newToken: user.auth.currentUser.accessToken,
          newDisplayName: user.auth.currentUser.displayName,
          newIsVerified: user.auth.currentUser.emailVerified,
          newPhotoUrl: user.auth.currentUser.photoURL,

          type: "login",
        });
      } else {
        dispatch({
          newName: "Guest",
          newId: null,
          newToken: null,
          newDisplayName: "Guest",
          newIsVerified: false,
          newPhotoUrl: "",

          type: "logout",
        });
      }
    });
  }, []);

  console.log("FirebaseAuthContext::UserProvider -> ", state);
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
