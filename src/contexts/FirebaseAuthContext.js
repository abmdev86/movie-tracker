import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmail,
  firebaseAuth,
  onAuthStateChange,
  signInUser,
  signOutUser,
  updateDisplayName,
  updateUserEmail,
  verifyEmail,
} from "../utils/firebaseAuth";

export const UserContext = createContext(null);
//export const UserDispatchContext = createContext(null);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setCurrentUser, setIsLoggedIn);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password, callback = null) => {
    await signInUser(email, password);
    setIsLoggedIn(true);
    if (callback) {
      return callback();
    }
  };

  const handleLogout = async (callback = null) => {
    await signOutUser();
    setIsLoggedIn(false);
    if (callback) {
      return callback;
    }
    alert("You have successfully signed out");
  };

  const handleCreateUser = async (email, password, callback = null) => {
    try {
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
      await verifyEmail(firebaseAuth.currentUser);
      if (callback) {
        return callback();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditDisplayName = async (name, callback = null) => {
    await updateDisplayName(name);
    const updatedUser = firebaseAuth.currentUser;

    if (updatedUser) {
      setCurrentUser({
        ...currentUser,
        displayName: updatedUser.displayName,
      });
    }
    if (callback !== null) {
      return callback();
    }
  };
  const handleEditEmail = async (email, callback = null) => {
    await updateUserEmail(email);
    const updatedUser = firebaseAuth.currentUser;

    if (updatedUser) {
      setCurrentUser({
        ...currentUser,
        email: updatedUser.email,
      });
    }

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
        handleEditDisplayName,
        handleEditEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
