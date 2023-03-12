import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initialUser } from "../contexts/FirebaseAuthContext";

export const firebaseAuth = getAuth(app);

const signInUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    throw error;
    //console.log("firebasAuth::ERROR::SignIn-> ", error);

    // todo redirect user to login page and display the error.
  }
};

const signOutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.log(error);
  }
};

const createUserWithEmail = async (email, password) => {
  //const newUser = null;
  try {
    const newUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

function onAuthStateChange(callback) {
  return firebaseAuth.onAuthStateChanged((user) => {
    let updatedUser = initialUser;
    if (user) {
      updatedUser = {
        id: user.uid,
        name: user.email,
        token: user.accessToken,
        displayName: user.displayName ?? `${user.email}`,
        isVerified: user.emailVerified,
        photoUrl: user.photoURL,
        online: user.auth.currentUser ? true : false,
      };
      callback((prev) => {
        return {
          ...prev,
          ...updatedUser,
        };
      });
    } else {
      callback({
        ...initialUser,
      });
    }
  });
}

export { signInUser, signOutUser, createUserWithEmail, onAuthStateChange };
