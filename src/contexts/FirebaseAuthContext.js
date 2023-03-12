import { createContext, useState } from "react";
import {
  createUserWithEmail,
  signInUser,
  signOutUser,
} from "../utils/firebaseAuth";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export const initialUser = {
  id: null,
  email: "",
  accessToken: "",
  displayName: "Guest",
  emailVerified: false,
  photoURL: "",
};

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password, callback = null) => {
    const loginUser = await signInUser(email, password);
    console.log(loginUser);
    setCurrentUser({
      id: loginUser.user.uid,
      email: loginUser.user.email,
      accessToken: loginUser.user.accessToken,
      displayName: loginUser.user.displayName ?? "NoName",
      emailVerified: loginUser.user.emailVerified,
      photoURL: loginUser.user.photoURL,
    });
    setIsLoggedIn(true);
    if (callback) {
      return callback();
    }
  };

  const handleLogout = async (callback = null) => {
    await signOutUser();
    setIsLoggedIn(false);
    setCurrentUser({ ...initialUser });
    if (callback) {
      return callback;
    }
    alert("You have successfully signed out");
  };

  const handleCreateUser = async (email, password, callback = null) => {
    const newUser = await createUserWithEmail(email, password);
    setCurrentUser({
      id: newUser.uid,
      email: newUser.email,
      accessToken: newUser.accessToken,
      displayName: newUser.displayName ?? "NoName",
      emailVerified: newUser.emailVerified,
      photoURL: newUser.photoURL,
    });
    setIsLoggedIn(true);
    if (callback) {
      return callback();
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        handleCreateUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
