import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";
import { redirect } from "react-router-dom";
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
      return {
        ...state,
        id: action.newId,
        name: action.newName,
        token: action.newToken,
        displayName: action.newDisplayName,
        isVerified: action.newIsVerified,
        photoUrl: action.newPhotoUrl,
        online: true,
      };
    }
    case "logout": {
      return {
        ...state,
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

function createInitialState(user) {
  return user;
}
export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(
    userReducer,
    initialUser,
    createInitialState
  );

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // set logged in user as the user being tracked with state.
        dispatch({
          newName: user.auth.currentUser.email,
          newId: user.auth.currentUser.uid,
          newToken: user.auth.currentUser.accessToken,
          newDisplayName: user.auth.currentUser.displayName,
          newIsVerified: user.auth.currentUser.emailVerified,
          newPhotoUrl: user.auth.currentUser.photoURL,
          online: true,
          type: "login",
        });
        // return redirect("/");
      } else {
        // did not login or logged out.
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
      return redirect("/login");
    });
  }, []);
  console.log("the state", state);
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
