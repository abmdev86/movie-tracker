import { FirebaseError } from "firebase/app";
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
  deleteCurrentUserFB,
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
  const auth = firebaseAuth;

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setCurrentUser, setIsLoggedIn);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password, callback = null) => {
    try {
      await signInUser(email, password);
      // setIsLoggedIn(true);
      if (callback) {
        return callback();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password": {
            alert("Wrong Email and/or password");
            return;
          }
          case "auth/too-many-requests": {
            alert("too many login attempts made, currently locked out");
            return;
          }
          default: {
            alert("something went wrong logging in");
            return;
          }
        }
      }
      //setIsLoggedIn(false);

      return;
    }
  };

  const handleLogout = async (callback = null) => {
    await signOutUser();
    // setIsLoggedIn(false);
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
      // setIsLoggedIn(true);
      await verifyEmail(firebaseAuth.currentUser);
      if (callback) {
        return callback();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        return;
      }
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
  const deleteCurrentUser = async (currentUser) => {
    try {
      await deleteCurrentUserFB(currentUser);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/insufficient-permission": {
            alert("You will need to reauthenticate to use this");
            return;
          }

          default: {
            alert("something went wrong with authenticating");
            return;
          }
        }
      }
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
        deleteCurrentUser,
        auth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
